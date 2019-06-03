import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

import Login from './components/Login/Login';

import './Watcher.scss';
import '../../../scss/Global.scss'; 

function AuthExample() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/watcher/public">Public Page</Link>
            </li>
            <li>
              <Link to="/watcher/protected">Protected Page</Link>
            </li>
          </ul>
          <Route path="/watcher/public" component={Public} />
          <Route path="/watcher/login" component={Login} />
          <PrivateRoute path="/watcher/protected" component={Protected} />
        </div>
      </Router>
    );
}
  
const AuthButton = withRouter(({ history }) =>
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push("/watcher/"));
                }}>
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
);
  
function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                <Component {...props} />
                ) : (
                <Redirect
                    to={{
                    pathname: "/watcher/login",
                    state: { from: props.location }
                    }}
                />
                )
            }
        />
    );
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};
  
function Public() {
return <h3>Public</h3>;
}
  
function Protected() {
return <h3>Protected</h3>;
}
  
class Login2 extends Component {
    state = { redirectToReferrer: false };
  
    login = () => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };
  
    render() {
      let { from } = this.props.location.state || { from: { pathname: "/watcher" } };
      let { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) return <Redirect to={from} />;
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      );
    }
}

class Watcher extends Component {
    state = {
        redirectToReferrer: false
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        let from = {pathname: "/watcher/"};
        let { redirectToReferrer } = this.state;

        return (
            <div>
                <Router>
                    {redirectToReferrer ? (
                        <Redirect to={from} />
                    ) : null}
                    <AuthButton />
                    <ul>
                        <li>
                            <Link to="/watcher/public">Public Page</Link>
                        </li>
                        <li>
                            <Link to="/watcher/login">Login Page</Link>
                        </li>
                        <li>
                            <Link to="/watcher/protected">Protected Page</Link>
                        </li>
                    </ul>
                    <Route path="/watcher/public" component={Public} />
                    <Route path="/watcher/login" render={() => (
                        <Login
                            login={this.login} />
                    )} />
                    <PrivateRoute path="/watcher/protected" component={Protected} />
                </Router>
            </div>
        )
    }
}
  

ReactDOM.render(<Watcher />, document.getElementById('app'));