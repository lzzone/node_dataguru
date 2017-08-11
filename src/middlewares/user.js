'use strict';

/**
 * pratics Node.js project
 * 
 * @author hank guo <291752361@qq.com>
 */

module.exports = function(done) {

    $.checkLogin = async function(req, res, next) {
        if (!req.session.user || !req.session.user._id) return next(new Error("please login firstly"));
        next();
    };

    $.checkTopicAuthor = async function(req, res, next) {
        if (!req.session.user || !req.session.user._id) return next(new Error("please login firstly"));
        const topic = await $.method('topic.get').call({ _id: req.params.topic_id });
        if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));
        if (topic.authorId.toString() !== req.session.user._id.toString()) {
            return next(new Error('access denied'));
        }
        req.topic = topic;
        next();
    };

    done();
};