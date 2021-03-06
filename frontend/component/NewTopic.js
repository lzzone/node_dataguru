import React from 'react';
import {addTopic} from '../lib/client';
import {redirectURL} from '../lib/utils';
import TopicEditor from './TopicEditor';

export default class NewTopic extends React.Component {
    render() {
        return (
            <TopicEditor
                title = "发表新主题"
                topic = {{title:' '}}
                onSave = {(topic, done) => {
                    addTopic(topic.title, topic.content, topic.tags)
                        .then(ret =>{
                            done();
                            redirectURL(`topic/${ret._id}`);
                        })
                        .catch(err =>{
                            done();
                            alert(err);
                        });
                }}
            />
        );
    }
}