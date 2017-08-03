'use strict';

/**
 * pratics Node.js project
 * 
 * @author hank guo <291752361@qq.com>
 */
import path from 'path';

module.exports = function(done) {
    $.router.get('/', function(req, res, next) {
        res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
    });

    done();
};