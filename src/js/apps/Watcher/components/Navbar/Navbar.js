import React, {Component} from 'react';

import './Navbar.scss';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark no-back">
                <a className="navbar-brand font heebo" href="/watcher"><i className="fa fa-eye mr-2"></i> Watcher</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fa-caret-down" id="collapsed"></span>
                    <span className="fa fa-caret-up" id="collapse"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        {/* if user */}
                        <li className="nav-item">
                            <a className="nav-link" href="/watcher/logout">Logout</a>
                        </li>
                        {/* if no user */}
                        <li className="nav-item">
                            <a className="nav-link" href="/watcher/login">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;