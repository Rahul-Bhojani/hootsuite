import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfilesByEmail } from '../../actions/profile'
import { withRouter } from 'react-router-dom'
import { loadUser } from '../../actions/auth'


import ShowDetails from './showDetails'

const StaffDetails = ({ profile: { profile }, auth: { user }, history }) => {
    React.useEffect(() => {
        loadUser()
    }, [])
    let showUpdateButton = false
    if (user) {
        if (user._id === (profile && profile._id)) {
            showUpdateButton = true;
        }
    }
    return (
        <div className="containers mx-5">
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-8 col-xl-8">
                    <div className="card shadow-lg o-hidden border-0 ">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="mx-5 my-3"> Profile Details of <span className="text-primary">
                                        {profile && profile.firstname.toUpperCase() + " " + profile.lastname.toUpperCase()}</span>
                                    </p>
                                    <hr className="mx-5" />
                                    <div className="row mx-5">

                                        <div className="col-lg-6">
                                            <div className="lg-form mb-0">

                                                <ShowDetails name={"Firstname "} value={profile && profile.firstname} />
                                                <ShowDetails name={"Lastname "} value={profile && profile.lastname} />
                                                <ShowDetails name={"Email "} value={profile && profile.email} />
                                                <ShowDetails name={"Phone no "} value={profile && profile && profile.mobileno} />

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="lg-form mb-0">

                                                <ShowDetails name={"Office no "} value={profile && profile.officeno} />
                                                <ShowDetails name={"Address "} value={profile && profile.address} />
                                                <ShowDetails name={"designation "} value={profile && profile.designation} />
                                                {/* <ShowDetails name={"birthdate(YYYY/MM/DD) "} value={profile.birthdate !== null && profile.birthdate.toString().replace('T00:00:00.000Z', '')} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mx-5" />

                                </div>
                                <div className="col-md-3 mb-3 mx-5">
                                    <button className="btn btn-primary btn-block text-white btn-user" type="submit" onClick={() => history.push('/dashboard')}>Back</button>
                                </div>
                                {
                                    showUpdateButton && <div className="col-md-3 mb-3 mx-5">
                                        <button className="btn btn-primary btn-block text-white btn-user" type="submit" onClick={() => history.push('/profile')}>update</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


StaffDetails.propTypes = {
    getProfilesByEmail: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, { getProfilesByEmail, loadUser })(withRouter(StaffDetails))
