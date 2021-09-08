import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCountData } from "../../actions/profile";

import AdminSidebar from "../sideBar/adminSidebar";
import AdminNav from "../navbar/navAdmin";
import { Link } from "react-router-dom";

const AdminDashboard = ({
  auth: { user },
  profile: { count },
  getCountData,
}) => {
  React.useEffect(() => {
    getCountData();
  }, [getCountData]);

  return (
    <div className="d-flex" id="wrapper">
      <AdminSidebar />
      <div id="page-content-wrapper">
        <AdminNav />
        {/* <div className="container-fluid">
                    
                </div> */}
        <div className=" mx-4 ">
          <div className="card shadow-sm border-1 my-5 px-4">
            <div class="row"></div>
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
                  <Link to="/staff" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-box shadow bg-success">
                  <div className="inner">
                    <h3> {count && count.staffHr} </h3>
                    <p>HR Strength</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                  </div>
                  <Link to="/staff?sort=true" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-box shadow bg-dark">
                  <div className="inner">
                    <h3> {count && count.staffAdmin} </h3>
                    <p>Ad</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-user-secret" aria-hidden="true"></i>
                  </div>
                  <Link to="/staff?sort=true" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-box shadow bg-warning">
                  <div className="inner">
                    <h3> {count && count.tasks} </h3>
                    <p>Task</p>
                  </div>
                  <div className="icon">
                    <i className="bi bi-clipboard-check"></i>
                  </div>
                  <Link to="/showAllTask" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-box shadow bg-danger">
                  <div className="inner">
                    <h3> {count && count.staffWithoutTask} </h3>
                    <p>Staff Without Task</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-tasks"></i>
                  </div>
                  <Link to="/showAllTask" className="card-box-footer">
                    View More <i className="fa fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCountData })(AdminDashboard);
