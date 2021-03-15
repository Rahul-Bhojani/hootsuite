import React, { useState } from "react";
import Input from '../formComponent/input';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

import PropTypes from 'prop-types'
import Alert from '../alert/alert'

const style = {
    backgroundImage: "url(https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png?v=1)",
    backgroundColor: "#3066b5"
}

const Register = ({ setAlert, register }) => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });

    const { firstname, lastname, username, password, email } = formData

    const handleSubmit = async (e) => {
        e.preventDefault();
        const send = await register({ firstname, lastname, username, email, password });
        if (send) {
            document.user.reset()
            // setTimeout(() => <Redirect to="/login" />, 3000);
            return <Redirect to="/login" />
        }
    }


    const handleChange = (e) => {
        setFormData(
            { ...formData, [e.target.name]: e.target.value }
        )

    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="flex-grow-1 bg-login-image" style={style}></div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <Alert />
                                        <div className="text-center">
                                            <h4 className="text-dark mb-4">Staff Registrations</h4>
                                        </div>

                                        <form name="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <Input
                                                    type="text" placeholder="FirstName"
                                                    handleChange={handleChange}
                                                    name="firstname"

                                                />
                                            </div>
                                            <div className="form-group">
                                                <Input
                                                    type="text" placeholder="LastName"
                                                    handleChange={handleChange}
                                                    name="lastname"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Input
                                                    type="text" placeholder="Username"
                                                    handleChange={handleChange}
                                                    name="username"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Input
                                                    placeholder="Email Address" type="email"
                                                    handleChange={handleChange}
                                                    name="email"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Input
                                                    type="password" placeholder="Password"
                                                    handleChange={handleChange}
                                                    name="password" />
                                            </div>
                                            <button className="btn btn-primary btn-block text-white btn-user" type="submit" >Register</button>
                                            <hr />
                                        </form>

                                        <div className="text-center"><Link className="small" to="/login">Login</Link></div>
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
Register.prototype = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register);
