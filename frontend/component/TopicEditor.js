import React from 'react';
import jQuery from 'jquery';

export default class TopicEditor extends React.Component {

    constructor(props){
        super(props);
        this.state = props.topic || {};
        setTimeout(() => {
            this.setState(this.props.topic)
        },0.001);
    }

    handleChange(name,e){
        this.setState({[name]: e.target.value});
    }

    handleSubmit(e) {
        this.props.onSave(this.state, () => {
            
        });
    }

    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {this.state.title}
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
                            <textarea className="form-control" id="ipt-content" rows="10" value={this.state.content} onChange={this.handleChange.bind(this, 'content')} placeholder="" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
                    </form>
                </div>
            </div>
        );
    }
}