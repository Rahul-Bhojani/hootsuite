import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from "../formComponent/input"
import Alert from '../alert/alert'
import AdminSidebar from '../sideBar/adminSidebar'
import HrSidebar from '../sideBar/hrSidebar'

import AdminNav from '../navbar/navAdmin'
import { assignTask, assignedTask, userTask } from '../../actions/task'

import ListStaff from '../staff/listStaff'

const AssignTask = ({ auth: { user }, task: { task, assignedUser }, assignTask, userTask, assignedTask, history, match }) => {

    useEffect(() => {
        assignedTask(task)
    }, [assignedTask, task])


    const [taskData, setTaskData] = useState({
        taskname: task.taskname,
        taskId: task._id,
        userId: null,
    });


    // if (task.length === 0) history.push('/listTask')
    const handleChange = (e) => {

        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        assignTask(taskData);
        userTask(task);
        assignedTask(task);
        history.push('/assignTask')
    }
    return (
        <div>
            <div className="d-flex" id="wrapper">
                {user && user.role === 1 && <AdminSidebar />}
                {user && user.role === 2 && <HrSidebar />}
                <div id="page-content-wrapper">
                    <AdminNav user={user} />
                    <div className="containers mx-5 mt-4 mb-2">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xl-12">
                                <div className="card shadow-sm o-hidden ">
                                    <div className="card-body p-0">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="p-4">
                                                    <div className="form-group mx-2">
                                                        <h5 className="mb-4">Assigned task to staff </h5>
                                                        <Alert />
                                                        <hr />
                                                        <form className="user" onSubmit={handleSubmit}>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="lg-form mb-0">
                                                                        <input hidden value={task._id} name="taskId" onChange={handleChange} />
                                                                        <label className="form-label text-primary">Taskname : <span className="text-danger">*</span></label>

                                                                        <Input
                                                                            placeholder="Taskname" type="text"
                                                                            name="taskname"
                                                                            value={task.taskname}
                                                                            // handleChange={handleChange}
                                                                            disabled={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <label className="form-label text-primary">Technology : <span className="text-danger">*</span></label>
                                                                    <Input
                                                                        type="text"
                                                                        name="technology"
                                                                        value={task.technology}
                                                                        // handleChange={handleChange}
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-12 mt-2">
                                                                    <label className="form-label text-primary">Staff : <span className="text-danger">*</span></label>
                                                                    <select className="form-control" name="userId" onChange={handleChange} required>
                                                                        <option value="null" selected>select User</option>
                                                                        {assignedUser && assignedUser.map((value) =>
                                                                            value.role !== 2 && <option key={value._id} value={value._id}>{value.firstname + ' ' + value.lastname + '  (' + value.designation + ')'}</option>)}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="modal-footer mt-3">
                                                                <button type="button" className="btn btn-secondary" onClick={() => history.goBack(match.url)}>Back</button>
                                                                <button type="submit" className="btn btn-primary">Assign task</button>
                                                            </div>
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
                    <div className="containers mx-5 mb-3"><ListStaff btn={false} titleValue="Task not assigned to any staff" /></div>
                </div>
            </div>
        </div>

    )
}

AssignTask.propTypes = {
    auth: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    assignTask: PropTypes.func.isRequired,
    assignedTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task,

})


export default connect(mapStateToProps, { assignTask, assignedTask, userTask })(withRouter(AssignTask))
