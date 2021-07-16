import React from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminSidebar from '../sideBar/adminSidebar';
import HrSidebar from '../sideBar/hrSidebar';
import AdminNav from '../navbar/navAdmin';
import Navbar from '../navbar/navbar';

import ListStaff from './listStaff'

const StaffAdminView = ({ auth: { user } }) => {
    return (
        <div className="d-flex" id="wrapper">
            { user && user.role === 1 && <AdminSidebar />}
            { user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                {user && user.role === 1 && <AdminNav />}
                {user && user.role === 2 && <AdminNav />}
                {user && user.role === 3 && <Navbar />}
                <div className="container-fluid mt-5 mb-3">
                    <ListStaff />
                </div>
            </div>
        </div>
    )
}
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});



StaffAdminView.propTypes = {

    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(StaffAdminView)