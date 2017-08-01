'use strict';

/**
 * pratics Node.js project
 * 
 * @author hank guo <291752361@qq.com>
 */

module.exports = function(set, get, has) {
    set('web.port', '3001');

    set('web.session.secret', 'test');

    set('web.session.redis', {
        host: '127.0.0.1',
        port: 6379,
    });
};