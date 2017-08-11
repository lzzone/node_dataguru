import React from 'react';
import jQuery from 'jquery';
import {updateTopic, getTopicDetail} from '../lib/client';
import {redirectURL} from '../lib/utils';
import TopicEditor from './TopicEditor';

export default class EditTopic extends React.Component {

    constructor(props){
        super(props);
        this.state ={topic: {}};
    }

    componentDidMount(){
        getTopicDetail(this.props.params.id)
            .then(topic => {
                this.setState({topic});
            }).catch(err => console.log(err));
    }

    render() {
        if (!this.state.topic) {
            return (
                <h3>正在加载...</h3>
            )
        }
        return (
            <TopicEditor
                title = {`编辑 ${this.state.topic.title}`}
                topic = {this.state.topic}
                onSave = {(topic, done) => {
                    console.log({id:topic._id, title:topic.title,content: topic.content, tags:topic.tags});
                    updateTopic(topic._id, topic.title, topic.content, topic.tags)
                        .then(ret =>{
                            done();
                            redirectURL(`/topic/${ret._id}`);
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