'use strict';

/**
 * pratics Node.js project
 * 
 * @author hank guo <291752361@qq.com>
 */
import mongoose from 'mongoose';

module.exports = function(done) {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    const User = new Schema({
        name: { type: String, unique: true },
        email: { type: String, unique: true },
        password: { type: String },
        nickname: { type: String },
        about: { type: String },
        isAdmin: {type: Boolean},
    });
    $.mongodb.model('User', User);
    $.model.User = $.mongodb.model('User');
    done();
};