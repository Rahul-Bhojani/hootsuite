import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Input from "../formComponent/input"
import TextArea from "../formComponent/textArea"
import { connect } from 'react-redux'
import { updateProfile } from '../../actions/profile'
import { loadUser } from '../../actions/auth'
import Alert from '../alert/alert'

const Profile = ({ auth: { user, loading }, loadUser, updateProfile, history, match }) => {

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        officeno: '',
        mobileno: '',
        designation: '',
        address: '',
        birthdate: ''
    });

    useEffect(() => {
        loadUser()
        setUserData({
            firstname: loading || !user.firstname ? '' : user.firstname,
            username: loading || !user.username ? '' : user.username,
            lastname: loading || !user.lastname ? '' : user.lastname,
            email: loading || !user.email ? '' : user.email,
            mobileno: loading || !user.mobileno ? '' : user.mobileno,
            officeno: loading || !user.officeno ? '' : user.officeno,
            address: loading || !user.address ? '' : user.address,
            designation: loading || !user.designation ? '' : user.designation,
            birthdate: loading || !user.birthdate ? '' : user.birthdate
        });

    }, [setUserData]) //eslint-disable-line

    const handleChange = (e) => {

        setUserData({ ...userData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        updateProfile(userData)
    }
    return (
        <div className="containers mx-5">

            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12 col-xl-12">
                    <div className="card shadow-lg o-hidden border-0 ">

                        <div className="card-body p-0">
                            <div className="row">

                                <div className="col-lg-12">


                                    <div className="p-4">

                                        <Alert />
                                        <div className="form-group mx-2">
                                            <button className="btn btn-primary float-right" onClick={() => history.goBack(match.url)}>Back</button>
                                        </div>
                                        <h5 className="mb-4">Welcome ,<b> <span className="text-primary">
                                            {user && user.firstname.toString().toUpperCase() + " " + user.lastname.toString().toUpperCase()}</span></b>
                                        </h5>

                                        <hr />

                                        <form className="user" onSubmit={handleSubmit}>

                                            <div className="row my-3">
                                                <div className="col-lg-4">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Firstname:</label>
                                                        <Input
                                                            placeholder="firstname" type="text"
                                                            handleChange={handleChange}
                                                            name="firstname"
                                                            value={userData.firstname}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Lastname:</label>
                                                        <Input
                                                            placeholder="Lastname" type="text"
                                                            handleChange={handleChange}
                                                            name="lastname"
                                                            value={userData.lastname}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Username:</label>
                                                        <Input
                                                            placeholder="Username" type="text"
                                                            handleChange={handleChange}
                                                            name="username"
                                                            value={userData.username}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row my-3">
                                                <div className="col-lg-4">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Email:</label>
                                                        <Input
                                                            placeholder="email" type="email"
                                                            handleChange={handleChange}
                                                            name="email"
                                                            value={userData.email}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Phone number:</label>
                                                        <Input
                                                            placeholder="phonenumber" type="number"
                                                            handleChange={handleChange}
                                                            name="mobileno"
                                                            value={userData.mobileno}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Office number:</label>
                                                        <Input
                                                            placeholder="officenumber" type="number"
                                                            handleChange={handleChange}
                                                            name="officeno"
                                                            value={userData.officeno}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row my-3">
                                                <div className="col-lg-6">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">position/title/designation:</label>
                                                        <Input
                                                            placeholder="position/title/designation" type="text"
                                                            handleChange={handleChange}
                                                            name="designation"
                                                            value={userData.designation}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Birth Date:</label>
                                                        { }
                                                        <Input
                                                            placeholder="birthdate" type="date"
                                                            handleChange={handleChange}
                                                            name="birthdate"
                                                            value={userData && userData.birthdate.toString().replace('T00:00:00.000Z', '')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row my-3">
                                                <div className="col-lg-12">
                                                    <div className="lg-form mb-0">
                                                        <label className="form-label text-primary">Address:</label>
                                                        <TextArea
                                                            placeholder="Address"
                                                            handleChange={handleChange}
                                                            name="address"
                                                            value={userData.address}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mx-1">
                                                <div className="col-md-3">
                                                    <button className="btn btn-primary btn-block text-white btn-user" type="submit">Update Details</button>
                                                </div>
                                            </div>
                                            <br />
                                        </form>
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

Profile.propTypes = {

    auth: PropTypes.object.isRequired,

    updateProfile: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth,

})

export default connect(mapStateToProps, { updateProfile, loadUser })(withRouter(Profile));