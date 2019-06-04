import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function GuardedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                rest.auth.isAuthenticated ? (
                <Component {...props} />
                ) : (
                <Redirect
                    to={{
                    pathname: "/watcher/login",
                    state: { from: rest.path }
                    }}
                />
                )
            }
        />
    );
}

export default GuardedRoute;