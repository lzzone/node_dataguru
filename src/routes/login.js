'use strict';

/**
 * pratics Node.js project
 * 
 * @author hank guo <291752361@qq.com>
 */

module.exports = function(done) {

    $.router.get('/api/login_user', async function(req, res, next) {
        res.apiSuccess({ user: req.session.user, token: req.session.logout_token });
    });

    $.router.post('/api/login', async function(req, res, next) {

        if (!req.body.password) return next(new Error('missing password'));

        const user = await $.method("user.get").call(req.body);
        if (!user) return next(new Error("user does not exists"));

        if (!req.body.password === user.password) {
            return next(new Error("incorrect password"));
        }

        req.session.user = user;
        req.session.logout_token = $.utils.randomString(20);

        res.apiSuccess({ token: req.session.logout_token });

    });

    $.router.post('/api/logout', async function(req, res, next) {
        
        delete req.session.user;
        delete req.session.logout_token;

        res.apiSuccess({});

    });

    $.router.post('/api/signup', async function(req, res, next) {
        const user = await $.method('user.add').call(req.body);

        res.apiSuccess({ user: user });

    });

    done();
};