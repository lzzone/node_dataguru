import React from 'react';
import jQuery from 'jquery';
import {login} from '../lib/client';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state ={};
    }

    handleChange(name,e){
        this.state[name] = e.target.value;
    }

    handleLogin(e) {
        const $btn = jQuery(e.target);
        $btn.text('loading');
        login(this.state.name, this.state.password)
            .then(ret =>{
                $btn.text('登录');
                alert('登陆成功');
                location.replace('/');
            })
            .catch(err =>{
                $btn.text('登录');
                alert(err);
            })
    }

    render() {
        return (
            <div style={{width:400, margin:'auto'}}>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            登录
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="ipt-name">
                                    用户名
                                </label>
                                <input type="text" className="form-control" id="ipt-name" onChange={this.handleChange.bind(this, 'name')} placeholder="" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    密码
                                </label>
                                <input type="password" className="form-control" id="password" onChange={this.handleChange.bind(this, 'password')} placeholder="" />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)}>登录</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}