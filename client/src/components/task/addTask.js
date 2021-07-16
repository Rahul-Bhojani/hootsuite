import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from '../sideBar/adminSidebar';
import HrSidebar from '../sideBar/hrSidebar'
import AdminNav from '../navbar/navAdmin'
import { connect } from 'react-redux';
import Alert from '../alert/alert';
import Input from "../formComponent/input";
import TextArea from "../formComponent/textArea";
import { addTask } from '../../actions/task'


const AddTask = ({ auth: { user }, addTask }) => {
    const [taskData, setTaskData] = useState({
        taskname: '',
        description: '',
        technology: '',
        duration: ''
    });

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }
    //submit data to server for staff login
    const handleSubmit = async (e) => {
        e.preventDefault();
        const send = await addTask(taskData);
        console.log(send);
        if (send) {
            document.user.reset();
        }
    }
    return (
        <div class="d-flex" id="wrapper">
            { user && user.role === 1 && <AdminSidebar />}
            { user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                <AdminNav />
                <div class="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-11 col-lg-12 col-xl-11">
                            <div className="card shadow-lg o-hidden border-0 my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <Alert />
                                                    <h4 className="text-dark mb-4">Create new task</h4>
                                                </div>
                                                <form name="user" onSubmit={handleSubmit}>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="col-form-label text-primary">Task Name : <span className="text-danger">*</span></label>
                                                                <Input
                                                                    placeholder="taskname" type="text"
                                                                    name="taskname" handleChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="col-form-label text-primary">Duration : <span className="text-danger">*</span></label>
                                                                <Input id="date"
                                                                    placeholder="duration" type="date"
                                                                    name="duration" handleChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-form-label text-primary">Technology : </label>
                                                        <input className="form-control form-control-user bg-white"
                                                            placeholder="technology" type="text"
                                                            name="technology" onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label text-primary" >Description : <span className="text-danger">*</span></label>
                                                        <TextArea
                                                            type="description" placeholder="description"
                                                            handleChange={handleChange}
                                                            name="description" />
                                                    </div>
                                                    <div class="col-md-5 p-0">
                                                        <button className="btn btn-primary text-white btn-user " type="submit">Create Task</button>
                                                    </div>
                                                    <hr />
                                                </form>
                                                {/* <div className="text-center"> Don't have account? <Link className="small" to="/register"> Register</Link></div> */}
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


var date = new Date();
date.setDate(date.getDate());



AddTask.propTypes = {
    auth: PropTypes.object.isRequired,
    addTask: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { addTask })(AddTask)
