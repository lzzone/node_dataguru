import React from 'react';
import jQuery from 'jquery';
import MarkdownEditor from './MarkdownEditor';

export default class TopicEditor extends React.Component {

    constructor(props){
        super(props);
        this.state = props.topic;
        this.interval = setInterval(() => {
            if (!this.state.title){
                this.setState(this.props.topic);
            }
            console.log(this.state.title);
        },1);
    }

    handleChange(name,e){
        this.setState({[name]: e.target.value});
    }

    handleSubmit(e) {
        this.props.onSave(this.state, () => {
            
        });
    }

    render() {
        if (this.state.title){
            window.clearInterval(this.interval);
        }else{
            return (
                <h3>正在加载中...</h3>
            )
        }
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {this.props.title}
                    </h3>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="ipt-title">
                                标题
                            </label>
                            <input type="text" className="form-control" id="ipt-title" value={this.state.title} onChange={this.handleChange.bind(this, 'title')} placeholder="" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ipt-tags">
                                标签
                            </label>
                            <input type="text" className="form-control" id="ipt-tags" value={this.state.tags} onChange={this.handleChange.bind(this, 'tags')} placeholder="" />
                            <p className="help-block">多个标签使用半角逗号分割</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ipt-content">
                                内容
                            </label>
                            <MarkdownEditor value={this.state.content} onChange={this.handleChange.bind(this, 'content')} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
                    </form>
                </div>
            </div>
        );
    }
}