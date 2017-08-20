import React from 'react';
import jQuery from 'jquery';
import {updateProfile, loginUser} from '../lib/client';
import {redirectURL} from '../lib/utils';

export default class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state ={};
    }

    componentDidMount(){
        loginUser()
            .then(user => this.setState(user))
            .catch(err => console.log(err));
    }

    handleChange(name,e){
        this.state[name] = e.target.value;
    }

    handleSave(e) {
        const $btn = jQuery(e.target);
        $btn.text('loading');
        updateProfile(this.state.email, this.state.nickname, this.state.about)
            .then(ret =>{
                $btn.text('修改');
                alert('修改成功');
            })
            .catch(err =>{
                $btn.text('修改');
                alert(err);
            })
    }

    render() {
        if (!this.state._id){
            return(
                <p>正在加载中。。。</p>
            )
        }
        return (
            <div style={{width:400, margin:'auto'}}>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {this.state.name} 的个人设置
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="ipt-email">
                                    邮箱
                                </label>
                                <input type="email" className="form-control" id="ipt-email" onChange={this.handleChange.bind(this, 'email')} placeholder="" defaultValue={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ipt-nickname">
                                    昵称
                                </label>
                                <input type="text" className="form-control" id="ipt-nickname" onChange={this.handleChange.bind(this, 'nickname')} placeholder="" defaultValue={this.state.nickname} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ipt-about">
                                    个人介绍
                                </label>
                                <textarea className="form-control" id="ipt-about" onChange={this.handleChange.bind(this, 'about')} placeholder="" defaultValue={this.state.about}></textarea>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.handleSave.bind(this)}>保存</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}