import React from 'react';
import jQuery from 'jquery';
import {editeTopic,getTopicDetail} from '../lib/client';
import {redirectURL,renderMarkdown} from '../lib/utils';

export default class EditTopic extends React.Component {

    constructor(props){
        super(props);
        this.state ={};
    }

    handleChange(name,e){
        this.state[name] = e.target.value;
    }

    handleSubmit(e) {
        editeTopic(this.state.topic._id, this.state.title, this.state.content, this.state.tags)
            .then(ret =>{
                redirectURL(`/topic/${ret._id}`);
            })
            .catch(err =>{
                alert(err);
            })
    }

    componentDidMount(){
        getTopicDetail(this.props.params.id)
            .then(topic => {
                topic.html = renderMarkdown(topic.content);
                this.setState({topic});
                jQuery('#ipt-title').val(topic.title);
                jQuery('#ipt-tags').val(topic.tags);
                jQuery('#ipt-content').val(topic.content);
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        编辑主题
                    </h3>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="ipt-title">
                                标题
                            </label>
                            <input type="text" className="form-control" id="ipt-title" onChange={this.handleChange.bind(this, 'title')} placeholder="" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ipt-tags">
                                标签
                            </label>
                            <input type="text" className="form-control" id="ipt-tags" onChange={this.handleChange.bind(this, 'tags')} placeholder="" />
                            <p className="help-block">多个标签使用半角逗号分割</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ipt-content">
                                内容
                            </label>
                            <textarea className="form-control" id="ipt-content" rows="10" onChange={this.handleChange.bind(this, 'content')} placeholder="" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>更新</button>
                    </form>
                </div>
            </div>
        );
    }
}