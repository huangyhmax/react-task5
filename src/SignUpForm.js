import React, {Component} from 'react';
 
export default class SignUpForm extends Component {
    render () {
        return (
        <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
            <div className="row">
            <label>邮箱</label>
            <input type="text" placeholder="Enter your email" value={this.props.formData.email}
                onChange={this.props.onChange.bind(null, 'email')}/>
            </div>
            <div className="row">
            <label className="user">用户名</label>
            <input type="text" placeholder="Enter your name" value={this.props.formData.username}
                onChange={this.props.onChange.bind(null, 'username')}/>
            {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
            </div>
            <div className="row">
            <label>密码</label>
            <input type="password" placeholder="Enter your password" value={this.props.formData.password}
                onChange={this.props.onChange.bind(null, 'password')}/>
            </div>
            <div className="row actions">
            <button type="submit">注册</button>
            </div>
        </form>
        )
    }
}

// let signUpForm = (
//     <form className="signUp" onSubmit={this.signUp.bind(this)}> 
//     <div className="row">
//         <label>邮箱</label> 
//         <input type="text" value={this.state.formData.email}
//             onChange={this.changeFormData.bind(this, 'email')}/>
//     </div>
//     <div className="row">
//         <label>用户名</label> 
//         <input type="text" value={this.state.formData.username}
//          onChange={this.changeFormData.bind(this,'username')}/>
//     </div>
//     <div className="row">
//         <label>密码</label>
//         <input type="password" value={this.state.formData.password} 
//          onChange={this.changeFormData.bind(this,'password')}/>
//     </div>
//     <div className="row actions">
//         <button type="submit">注册</button>
//     </div>
//     </form>
// )