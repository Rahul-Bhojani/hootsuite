import React, { useState } from "react";
import Input from '../formComponent/input';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../alert/alert';

// const style = {
//     backgroundImage: "url(https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png?v=1)",
//     backgroundColor: "#3066b5"
// }
const Register = ({ register, history }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });
    const { firstname, lastname, username, password, email } = formData

    //set formData to state
    const handleChange = (e) => {
        setFormData(
            { ...formData, [e.target.name]: e.target.value }
        )
    }
    //submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        const send = await register({ firstname, lastname, username, email, password });
        if (send) {
            document.user.reset()
            setTimeout(() => history.push('/login'), 4000);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <Alert />
                                        <div className="text-center">
                                            <h4 className="text-dark mb-4">Staff Registrations</h4>
                                        </div>
                                        <form name="user" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-label text-primary">Firstname:</label>
                                                        <Input
                                                            type="text" placeholder="FirstName"
                                                            handleChange={handleChange}
                                                            name="firstname"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-label text-primary">Lastname:</label>
                                                        <Input
                                                            type="text" placeholder="LastName"
                                                            handleChange={handleChange}
                                                            name="lastname"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-label text-primary">Username:</label>
                                                        <Input
                                                            type="text" placeholder="Username"
                                                            handleChange={handleChange}
                                                            name="username"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-label text-primary">Email:</label>
                                                        <Input
                                                            placeholder="Email Address" type="email"
                                                            handleChange={handleChange}
                                                            name="email"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label text-primary">Password:</label>
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
    register: PropTypes.func.isRequired
}
export default connect(null, { register })(withRouter(Register));
