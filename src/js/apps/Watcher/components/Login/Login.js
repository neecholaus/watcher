import React, {Component} from 'react';

import './Login.scss';

class Login extends Component {
    state = {
        redirectToReferrer: false
    }

    render() {
        return (
            <div id="login-con">
                <div id="login-box">
                    <h3 className="mt-2 mb-4 font heebo">Login</h3>
                    <form action="/watcher/login" method="POST">
                        <input 
                            type="text"
                            placeholder="Email"
                            name="email"
                            autoComplete="off"
                            required />
                        <input 
                            type="password"
                            className="mt-20"
                            placeholder="Password"
                            name="password"
                            required />
                        <div className="text-right">
                            <button type="button"
                                    className="btn btn-primary mt-3 slide-icon"
                                    onClick={this.props.login}>
                                <i className="fa fa-sign-in"></i> Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="login-filler"></div>
            </div>
        )
    }
}

export default Login;