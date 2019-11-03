import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    checkCredentials = () => {
        let fd = new FormData();

        fetch('/watcher/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.success) {
                    window.sessionStorage.setItem('token', res.token);
                    this.props.login();
                } else {
                    window.sessionStorage.removeItem('token');
                    this.setState({password: ''});
                }
            });
    }

    onChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        let {from} = this.props.location.state || {from: '/watcher/'};
        let {redirectToReferrer} = this.props;

        if(redirectToReferrer) return <Redirect to={from} />;

        return (
            <div className="container">
                <div className="block">
                    <h2 style={{color:'#e3e3e3'}}>Login</h2>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        autoComplete="off"
                        onChange={this.onChange}
                        value={this.state.email}
                        required />
                    <input
                        type="password"
                        className="mt-20"
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        required />
                    <div className="text-right">
                        <button type="button"
                                className="btn btn-utility mt-30"
                                onClick={this.checkCredentials}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;