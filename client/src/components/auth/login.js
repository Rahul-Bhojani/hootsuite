import React, { useState } from "react";
import Input from "../formComponent/input";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../alert/alert';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { username, password } = formData
    //set formData to state
    const handleChange = (e) => {
        setFormData(
            { ...formData, [e.target.name]: e.target.value }
        )
    }
    //submit data to server for staff login
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(username, password);
    }
    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                {/* <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="flex-grow-1" style={style}></div>
                                </div> */}
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <Alert />
                                            <h4 className="text-dark mb-4">Sign In to your account</h4>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="form-label text-primary" >Username : <span className="text-danger">*</span></label>
                                                <Input
                                                    placeholder="Username" type="text"
                                                    handleChange={handleChange}
                                                    name="username"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label text-primary" >Password : <span className="text-danger">*</span></label>
                                                <Input
                                                    type="password" placeholder="Password"
                                                    handleChange={handleChange}
                                                    name="password" />
                                            </div>
                                            <button className="btn btn-primary btn-block text-white btn-user" type="submit">Login</button>
                                            <hr />
                                        </form>
                                        {/* <div className="text-center"> Don't have account? <Link className="small" to="/register"> Register</Link></div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
