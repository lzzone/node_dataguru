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

    done();
};