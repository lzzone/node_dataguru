import React from 'react';
import jQuery from 'jquery';
import MarkdownEditor from './MarkdownEditor';

export default class CommentEditor extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    handleChange(name,e){
        this.setState({[name]: e.target.value});
    }

    handleSubmit(e) {
        this.props.onSave(this.state, () => {
            
        });
    }

    render() {
        if (!this.props.title){
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
                            <label htmlFor="ipt-content">
                                内容
                            </label>
                            <MarkdownEditor value={this.state.content} onChange={this.handleChange.bind(this, 'content')} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>发表</button>
                    </form>
                </div>
            </div>
        );
    }
}