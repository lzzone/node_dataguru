import browserRequest from 'browser-request';

const urlBase = '/api/';

export function request(method, path, data = {}) {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();
        const options = {
            method,
            url: `${urlBase}/${path}`,
        };
        if (method === 'GET' || method === 'HEAD') {
            options.qs = data;
        } else {
            options.form = data;
        }
        browserRequest(options, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                let data;
                try {
                    data = JSON.parse(body.toString());
                } catch (err) {
                    return reject(new Error('parse JSON data error: ' + err.message));
                }
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.result);
                }
            }
        });
    });
}

// login
export function getLoginUser() {
    return request('get', 'login_user').then(ret => ret.topic);
}

export function login(options) {
    return request('post', 'login', options).then(ret => ret.topic);
}

export function logout(options) {
    return request('post', 'logout', options).then(ret => ret.topic);
}

export function signup(options) {
    return request('post', 'signup', options).then(ret => ret.topic);
}

// topic
export function addTopic(options) {
    return request('post', 'topic/add', options).then(ret => ret.topic);
}

export function getTopicList(options) {
    return request('get', 'topic/list');
}

export function getTopicDetail(id) {
    return request('get', `topic/item/${id}`).then(ret => ret.topic);
}

export function postTopicDetail(options) {
    return request('post', `topic/item/${options.id}`, options);
}

export function deleteTopicDetail(id) {
    return request('delete', `topic/item/${id}`);
}

export function addComment(options) {
    return request('get', `topic/item/${options.id}/comment/add`, options);
}

export function deleteComment(options) {
    return request('get', `topic/item/${options.id}/comment/delete`, options);
}