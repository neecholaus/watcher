import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import Login from './components/Login/Login';
import UploadImage from './components/UploadImage/UploadImage';
import GenerateInvite from './components/GenerateInvite/GenerateInvite';

import './Watcher.scss';
import CaptureCanvas from './components/CaptureCanvas/CaptureCanvas';

const auth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100);
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};

class Watcher extends Component {
    state = {
        redirectToReferrer: false
    }

    login = () => {
        auth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    logout = () => {
        auth.signout(() => {
            fetch('/watcher/logout', {method:'POST'});
            this.setState({ redirectToReferrer: false });
            window.sessionStorage.removeItem('token');
        });
    }

    componentWillMount = () => {
        const ls = window.sessionStorage;
        const token = ls.token;

        fetch(`/watcher/verify-token/${token}`)
            .then(res => res.json())
            .then(res => {
                if(res.valid) {
                    ls.setItem('token', res.token);
                    this.login();
                } else {
                    ls.removeItem('token');
                    this.logout();
                }
            });
    }

    render() {
        let from = {pathname: "/watcher/"};
        let { redirectToReferrer } = this.state;

        return (
            <div id="watcher">
                <Router>
                    
                    <div id="navbar">
                        {auth.isAuthenticated ? (
                            <a className="nav-link" onClick={this.logout}>
                                Log out
                            </a>
                        ) : null}

                        <Link
                            to="/watcher/upload-image"
                            className="nav-link">Upload Image</Link>
                        <Link
                            to="/watcher/generate-invite"
                            className="nav-link">Generate Invite</Link>
                        <Link 
                            to="/watcher/capture-canvas"
                            className="nav-link">Capture Canvas</Link>
                    </div>
                    
                    <Route path="/watcher/login" render={props => (
                        <Login
                            {...props}
                            login={this.login}
                            from={from}
                            redirectToReferrer={redirectToReferrer} />
                    )} />

                    <GuardedRoute
                        auth={auth}
                        path="/watcher/upload-image"
                        component={UploadImage} />
                    <GuardedRoute
                        auth={auth}
                        path="/watcher/generate-invite"
                        component={GenerateInvite} />
                    <GuardedRoute
                        auth={auth}
                        path="/watcher/capture-canvas"
                        component={CaptureCanvas} />
                </Router>
            </div>
        )
    }
}
  

ReactDOM.render(<Watcher />, document.getElementById('app'));