import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';

const NavAdmin = ({ auth: { user }, logout }) => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            {/* <button className="btn btn-primary" id="menu-toggle">Menu</button> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 pr-5">
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" >
                            {user.username}
                        </Link>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/profile">Profile</Link>
                            <Link className="dropdown-item pr-0" to="/change-password">Change Password</Link>

                            <Link className="dropdown-item pr-0" onClick={logout} to="/login">Logout</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

NavAdmin.prototype = {
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(NavAdmin)
