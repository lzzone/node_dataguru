'use strict';

/**
 * pratics Node.js project
 * 
 * @author hank guo <291752361@qq.com>
 */
import validator from 'validator';

module.exports = function(done) {

    $.method("topic.add").check({
        author: { required: true, validate: (v) => validator.isMongoId(String(v)) },
        title: { required: true },
        content: { required: true },
        tags: { validate: (v) => Array.isArray(v) },

    });
    $.method("topic.add").register(async function(params) {
        const topic = new $.model.Topic(params);
        topic.createdAt = new Date();
        return topic.save();
    });

    $.method("topic.get").check({
        _id: { required: true, validate: (v) => validator.isMongoId(String(v)) },
    });
    $.method("topic.get").register(async function(params) {
        return $.model.Topic.findOne({ _id: params._id })
        .populate({
            path: 'author',
            model: 'User',
            select: 'nickname about'
        }).populate({
            path: 'comments.author',
            model: 'User',
            select: 'nickname about'
        });
    });

    $.method("topic.list").check({
        author: { validate: (v) => validator.isMongoId(String(v)) },
        tags: { validate: (v) => Array.isArray(v) },
        skip: { validate: (v) => v >= 0 },
        limit: { validate: (v) => v > 0 },
    });
    $.method("topic.list").register(async function(params) {
        const query = {};
        if (params.author) query.author = params.author;
        if (params.tags) query.tags = { $all: params.tags };

        const ret = $.model.Topic.find(query, {
            author: 1,
            title: 1,
            tags: 1,
            createdAt: 1,
            updatedAt: 1,
            lastCommentedAt: 1,
        }).populate({
            path: 'author',
            model: 'User',
            select: 'nickname about'
        });
        if (params.skip) ret.skip(params.skip);
        if (params.limit) ret.limit(params.limit);
        return ret;
    });

    $.method("topic.count").check({
        author: { validate: (v) => validator.isMongoId(String(v)) },
        tags: { validate: (v) => Array.isArray(v) },
    });
    $.method("topic.count").register(async function(params) {
        const query = {};
        if (params.author) query.author = params.author;
        if (params.tags) query.tags = { $all: params.tags };

        return $.model.Topic.count(query);
    });

    $.method("topic.delete").check({
        _id: { required: true, validate: (v) => validator.isMongoId(String(v)) },
    });
    $.method("topic.delete").register(async function(params) {
        return $.model.Topic.remove({ _id: params._id });
    });

    $.method("topic.update").check({
        _id: { required: true, validate: (v) => validator.isMongoId(String(v)) },
        tags: { validate: (v) => Array.isArray(v) },
    });
    $.method("topic.update").register(async function(params) {
        const update = { updateAt: new Date() };
        if (params.title) update.title = params.title;
        if (params.content) update.content = params.content;
        if (params.tags) update.tags = params.tags;
        return $.model.Topic.update({ _id: params._id }, { $set: update });
    });

    $.method("topic.comment.add").check({
        _id: { required: true, validate: (v) => validator.isMongoId(String(v)) },
        author: { required: true, validate: (v) => validator.isMongoId(String(v)) },
        content: { required: true },
    });
    $.method("topic.comment.add").register(async function(params) {
        const comment = {
            author: params.author,
            content: params.content,
            createdAt: new Date(),
        };
        return $.model.Topic.update({ _id: params._id }, {
            $push: {
                comments: comment
            }
        });
    });

    $.method("topic.comment.get").check({
        _id: { required: true, validate: (v) => validator.isMongoId(String(v)) },
        cid: { required: true, validate: (v) => validator.isMongoId(String(v)) },
    });
    $.method("topic.comment.get").register(async function(params) {
        return $.model.Topic.findOne({
            _id: params._id,
            'comments._id': params.cid
        }, {
            'comments.$': 1
        }).populate({
            path: 'author',
            model: 'User',
            select: 'nickname about'
        });
    });

    $.method("topic.comment.delete").check({
        _id: { required: true, validate: (v) => validator.isMongoId(String(v)) },
        cid: { required: true, validate: (v) => validator.isMongoId(String(v)) },
    });
    $.method("topic.comment.delete").register(async function(params) {
        return $.model.Topic.update({ _id: params._id }, {
            $pull: {
                comments: {
                    _id: params.cid,
                }
            }
        });
    });







    done();
};