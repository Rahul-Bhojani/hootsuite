import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import Input from "../formComponent/input";
import TextArea from "../formComponent/textArea";
import { connect } from 'react-redux';
import { updateProfile, getProfilesById } from '../../actions/profile';
import Alert from '../alert/alert';
import HrSidebar from '../sideBar/hrSidebar'
import AdminNav from '../navbar/navAdmin';
import AdminSidebar from '../sideBar/adminSidebar';
import Navbar from '../navbar/navbar';

const Profile = ({ auth: { user }, updateProfile, loadUser, getProfilesById, history, match }) => {

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
        getProfilesById(user, history, false)
        setUserData({
            firstname: !user ? '' : user.firstname,
            username: !user ? '' : user.username,
            lastname: !user ? '' : user.lastname,
            email: !user ? '' : user.email,
            mobileno: !user ? '' : user.mobileno,
            officeno: !user ? '' : user.officeno,
            address: !user ? '' : user.address,
            designation: !user ? '' : user.designation,
            birthdate: !user ? '' : user.birthdate
        });

    }, [setUserData]) //eslint-disable-line

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(userData, history)
    }
    return (
        <div className="d-flex" id="wrapper">
            { user && user.role === 1 && <AdminSidebar />}
            { user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                {user && user.role === 1 && <AdminNav />}
                {user && user.role === 2 && <AdminNav />}
                {user && user.role === 3 && <Navbar />}
                <div className="container-fluids">
                    <div className="containers mx-5 m-auto">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xl-12">
                                <div className="cards">
                                    <div className="card-body p-4 mt-4">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="p-4">
                                                    <Alert />
                                                    {/* <div className="form-group mx-2">
                                                        <button className="btn btn-primary float-right" onClick={() => history.goBack(match.url)}>Back</button>
                                                    </div> */}
                                                    <h5 className="mb-4">
                                                        Welcome ,<b> <span className="text-primary">
                                                            {user && user.firstname.toString().toUpperCase() + " " + user.lastname.toString().toUpperCase()}</span></b>
                                                    </h5>
                                                    <hr />
                                                    <form className="user" onSubmit={handleSubmit}>
                                                        <div className="row my-3">
                                                            <div className="col-lg-4">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">First Name :</label>
                                                                    <Input
                                                                        placeholder="firstname" type="text"
                                                                        name="firstname"
                                                                        value={user && user.firstname}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">Last Name :</label>
                                                                    <Input
                                                                        placeholder="Lastname" type="text"
                                                                        name="lastname"
                                                                        value={user && user.lastname}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">Username :</label>
                                                                    <Input
                                                                        placeholder="Username" type="text"
                                                                        name="username"
                                                                        value={user && user.username}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row my-3">
                                                            <div className="col-lg-4">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">Email :</label>
                                                                    <Input
                                                                        placeholder="email" type="email"
                                                                        name="email"
                                                                        value={user && user.email}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">Phone number :</label>
                                                                    <Input
                                                                        placeholder="phonenumber" type="number"
                                                                        name="mobileno"
                                                                        value={user && user.mobileno}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">Office number :</label>
                                                                    <Input
                                                                        placeholder="officenumber" type="number"
                                                                        name="officeno"
                                                                        value={user && user.officeno}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row my-3">
                                                            <div className="col-lg-6">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">position/designation :</label>
                                                                    <Input
                                                                        placeholder="position/title/designation" type="text"
                                                                        name="designation"
                                                                        value={user && user.designation}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">Birth Date :</label>

                                                                    <Input
                                                                        placeholder="birthdate" type="date"
                                                                        name="birthdate"
                                                                        value={user && user.birthdate ?
                                                                            user.birthdate.toString().replace('T00:00:00.000Z', '')
                                                                            : ''}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row my-3">
                                                            <div className="col-lg-12">
                                                                <div className="lg-form mb-0">
                                                                    <label className="form-label text-primary">Address :</label>
                                                                    <TextArea
                                                                        placeholder="Address"
                                                                        name="address"
                                                                        value={user && user.address}
                                                                        handleChange={handleChange}
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
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getProfilesById: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,

}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { updateProfile, getProfilesById, loadUser })(withRouter(Profile));