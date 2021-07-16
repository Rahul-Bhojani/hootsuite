import React from 'react'
import $ from 'jquery';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminSidebar from '../sideBar/adminSidebar';
import HrSidebar from '../sideBar/hrSidebar';
import AdminNav from '../navbar/navAdmin';
import Navbar from '../navbar/navbar';
import { getProfilesById } from '../../actions/profile'
import { userDetailTask } from '../../actions/task'


const UserDetails = ({ auth: { user }, profile: { profile }, task: { task }, match, history, userDetailTask }) => {

    React.useEffect(() => {
        userDetailTask(profile)
    }, [userDetailTask, profile])
    if (profile === null) {
        return true
    }

    var fullName = profile.firstname + " " + profile.lastname
    var full = fullName.split(' ')


    return (
        <div className="d-flex" id="wrapper">
            { user && user.role === 1 && <AdminSidebar />}
            { user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                {user && user.role === 1 && <AdminNav />}
                {user && user.role === 2 && <AdminNav />}
                {user && user.role === 3 && <Navbar />}
                <div className="container-fluid mt-4">

                    <div className="row m-3">
                        <button type="button" className="btn  btn-primary" onClick={() => history.goBack(match.url)}>Back</button>
                    </div>
                    <div className="row justify-content">

                        <div className="col-md-12 col-lg-8 col-xl-8 mb-3">
                            <div className="card shadow-lg" style={{ height: "380px" }}>
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* <button type="button" className="btn btn-secondary" onClick={() => history.goBack(match.url)}>Back</button> */}
                                            <h2 className="text-center m-4 text-muted">Assined Task</h2>
                                            <hr />
                                            <div className="card border-0" >
                                                <div className="card-body pt-0">
                                                    <h1 className="card-title  text-primary">{task && task.taskname && task.taskname.toUpperCase()}</h1>
                                                    <h5 className="card-subtitle mb-2 mt-3">{task && task.technology}</h5>
                                                    <p className="mt-3" style={{ fontSize: '20px' }}>{task && task.description && task.description.slice(0, 100) + '...'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4 col-xl-4">
                            <div className="card shadow-lg">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div id="profileImage" className="text-center">
                                                {full.shift().charAt(0).toUpperCase() + full.pop().charAt(0).toUpperCase()}

                                            </div>
                                            <div className="text-center">
                                                <div class="col-md-12">
                                                    <div class="profile-head">
                                                        <h2 className="text-uppercase text-muted">{fullName}</h2>
                                                        <h6 className="text-center text-primary ">{profile.designation}</h6>
                                                        {/* <p class="proile-rating">RANKINGS : <span>8/10</span></p> */}
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <h6 className="text-center text-primary "><a href={"mailto:" + profile.email}><i class="bi bi-envelope"></i>
                                                                <span className="h6 text-center  text-muted"> {profile.email}</span></a></h6>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12 mb-3">
                                                            <h6 className="text-center text-primary">
                                                                <a href="tel:7574994462">
                                                                    <i class="bi bi-phone"></i> <span className="h6 text-muted"> {profile.mobileno}</span>
                                                                </a></h6>
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
            </div>
        </div>
    )
}
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

UserDetails.propTypes = {

    auth: PropTypes.object.isRequired,
    getProfilesById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    task: state.task
})

export default connect(mapStateToProps, { getProfilesById, userDetailTask })(withRouter(UserDetails))