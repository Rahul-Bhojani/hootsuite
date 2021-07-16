import React, { useState } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminSidebar from '../sideBar/adminSidebar'
import HrSidebar from '../sideBar/hrSidebar'
import AdminNav from '../navbar/navAdmin'
import Input from '../formComponent/input';
import Alert from '../alert/alert';
import { register } from '../../actions/auth';
// import { Link } from 'react-router-dom';



const AddStaff = ({ auth: { user }, register }) => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        mobileno: '',
        role: '',
        designation: '',
    });


    const { firstname, lastname, username, email, mobileno, role, designation } = formData;

    //set formData to state
    const handleChange = (e) => {

        setFormData(
            { ...formData, [e.target.name]: e.target.value }
        )
    }
    //submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();

        const send = await register({ firstname, lastname, username, email, mobileno, role, designation });
        if (send) {
            document.user.reset()
        }
    }

    return (
        <div className="d-flex" id="wrapper">
            { user && user.role === 1 && <AdminSidebar />}
            { user && user.role === 2 && <HrSidebar />}

            <div id="page-content-wrapper">
                <AdminNav />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-11 col-lg-12 col-xl-11">
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
                                                                <label className="form-label text-primary">First Name  <span className="text-danger">*</span></label>
                                                                <Input
                                                                    type="text" placeholder="FirstName"
                                                                    handleChange={handleChange}
                                                                    name="firstname"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="form-label text-primary">Last Name  <span className="text-danger">*</span></label>
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
                                                                <label className="form-label text-primary">User Name  <span className="text-danger">*</span></label>
                                                                <Input
                                                                    type="text" placeholder="Username"
                                                                    handleChange={handleChange}
                                                                    name="username"

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="form-label text-primary">Email Id  <span className="text-danger">*</span></label>
                                                                <Input
                                                                    placeholder="Email Address" type="email"
                                                                    handleChange={handleChange}
                                                                    name="email"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="form-label text-primary">Designation  <span className="text-danger">*</span></label>
                                                                <Input
                                                                    type="text" placeholder="Designation"
                                                                    handleChange={handleChange}
                                                                    name="designation"

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label className="form-label text-primary">Role  <span className="text-danger">*</span></label>

                                                                <select className="form-control" name="role" onChange={handleChange} required>
                                                                    <option disabled selected>select role</option>
                                                                    {user && user.role === 1 && <><option value="1">Admin</option>
                                                                        <option value="2">HR Manager</option></>}
                                                                    <option value="3">Employee</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label text-primary">Mobile No.  <span className="text-danger">*</span></label>
                                                        <Input
                                                            type="number" placeholder="Mobile number"
                                                            handleChange={handleChange}
                                                            name="mobileno" />
                                                    </div>
                                                    <hr className="mt-4" />
                                                    <button className="btn btn-primary btn-block text-white btn-user mt-4" type="submit" >Register</button>

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
    )
}
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});



AddStaff.propTypes = {

    auth: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    auth: state.auth,

})

export default connect(mapStateToProps, { register })(AddStaff)