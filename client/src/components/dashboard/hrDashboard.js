import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCountData } from '../../actions/profile';

import HrSidebar from '../sideBar/hrSidebar'
import AdminNav from '../navbar/navAdmin'
import { Link } from 'react-router-dom'

const HrDashboard = ({ auth: { user }, profile: { count }, getCountData }) => {


    React.useEffect(() => {
        getCountData()
    }, [getCountData])

    return (
        <div className="d-flex" id="wrapper">
            <HrSidebar />
            <div id="page-content-wrapper">
                <AdminNav />
                {/* <div className="container-fluid">
                    
                </div> */}
                <div className=" mx-4 ">
                    <div className="card shadow-sm border-1 my-5 px-4">
                        <div class="row">
                            {/* <div class="col-lg-12 mt-4 ml-2">
                                <h1></h1>
                            </div> */}
                        </div>
                        <div className="row ">
                            <div className="col-lg-3 col-sm-6">

                                <div className="card-box shadow shadow bg-primary">

                                    <div className="inner">
                                        <h3> {count && count.staffMember} </h3>
                                        <p>Staff Strength</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-users" aria-hidden="true"></i>
                                    </div>
                                    <Link to="/staff" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card-box shadow bg-success">
                                    <div className="inner">
                                        <h3> {count && count.staffHr} </h3>
                                        <p>HR Strength</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-user-secret" aria-hidden="true"></i>
                                    </div>
                                    <Link to="/staff?sort=true" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card-box shadow bg-warning">
                                    <div className="inner">
                                        <h3> {count && count.tasks} </h3>
                                        <p>Task</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-tasks" aria-hidden="true"></i>
                                    </div>
                                    <Link to="/showAllTask" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card-box shadow bg-danger">
                                    <div className="inner">
                                        <h3> {count && count.staffWithoutTask} </h3>
                                        <p>Staff Without Task</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-tags fa-1x"></i>
                                    </div>
                                    <Link to="/showAllTask" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="card-box  shadow bg-dark">
                                    <div className="inner">
                                        <h3> 13436 </h3>
                                        <p>Staff Without Task</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-user-times" aria-hidden="true"></i>
                                    </div>
                                    <Link to="/" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}


HrDashboard.propTypes = {
    auth: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCountData })(HrDashboard);
