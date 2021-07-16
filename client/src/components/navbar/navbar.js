import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import staffImg from '../../utils/staff-nav.png'

const imgStyle = {
    height: "40px"
}
const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    //if user login 
    const authLinks = (
        <ul className="navbar-nav mr-auto"><li className="nav-item lead">
            <Link className="nav-link" to="/staff">Staff </Link>
        </li>
            <li className="nav-item lead">
                <Link className="nav-link" to="/listTask">Task</Link>
            </li>
        </ul>
    );
    //open links
    const openLinks = (
        <>
            <li className="nav-item ">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </>
    )
    //user profile and logout link 
    const authDestroy = (
        <div className="dropdown show ml-auto mt-2 mt-lg-0 pr-5">
            <a className="btn" href="/" role="button" data-toggle="dropdown" >{user && user.username + ' '}
                <i className="bi bi-person-circle"> </i>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <Link className="dropdown-item pr-0" to="/change-password">Change Password</Link>
                <Link className="dropdown-item" onClick={logout} to="/login">Logout</Link>
            </div>
        </div>
    );
    //if user authnticated and loading false then show authlink and authDestroy link else show openlink
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"><img src={staffImg} style={imgStyle} alt="staff portal" className="bg-light" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {!loading && (
                    <Fragment>
                        {
                            isAuthenticated && authLinks
                        }
                    </Fragment>
                )}
                <ul className="navbar-nav">
                    {!loading && (
                        <Fragment>
                            {
                                isAuthenticated ? authDestroy : openLinks
                            }
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    )
}
Navbar.prototype = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)
