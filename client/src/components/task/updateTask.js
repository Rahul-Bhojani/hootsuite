import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateTask } from '../../actions/task'
import Input from "../formComponent/input"
import TextArea from '../formComponent/textArea';
import Alert from '../alert/alert'
import AdminSidebar from '../sideBar/adminSidebar'
import HrSidebar from '../sideBar/hrSidebar'

import AdminNav from '../navbar/navAdmin'

const UpdateTask = ({ auth: { user }, task: { task, loading }, updateTask, history, match }) => {

    const [taskData, setTaskData] = useState({

        taskname: '',
        description: '',
        duration: ''
    });

    useEffect(() => {
        setTaskData({
            _id: loading || !task._id ? '' : task._id,
            taskname: loading || !task.taskname ? '' : task.taskname,
            description: loading || !task.description ? '' : task.description,
            technology: loading || !task.technology ? '' : task.technology,
            duration: loading || !task.duration ? '' : task.duration
        });
    }, []) //eslint-disable-line

    // if (task.length === 0) history.push('/listTask')
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.description !== taskData.description || task.taskname !== taskData.taskname || task.duration !== taskData.duration) {
            updateTask(taskData);
        }
    }
    return (
        <div>
            <div className="d-flex" id="wrapper">
                {user && user.role === 1 && <AdminSidebar />}
                {user && user.role === 2 && <HrSidebar />}
                <div id="page-content-wrapper">
                    <AdminNav user={user} />
                    <div className="container-fluid mt-5"></div>
                    <div className="containers mx-5 mt-3">
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-12 col-xl-11">
                                <div className="card shadow-lg o-hidden border-0 ">
                                    <div className="card-body p-0">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="p-4">
                                                    <div className="form-group mx-2">
                                                        <h5 className="mb-4">Update Task </h5>
                                                        <Alert />
                                                        <hr />
                                                        <form className="user" onSubmit={handleSubmit}>
                                                            <div className="row my-3">
                                                                <div className="col-lg-6">
                                                                    <div className="lg-form mb-0">
                                                                        <label className="form-label text-primary">Taskname:</label>
                                                                        <Input
                                                                            placeholder="Taskname" type="text"
                                                                            name="taskname"
                                                                            value={task.taskname}
                                                                            handleChange={handleChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <label className="form-label text-primary">Duration:</label>
                                                                    <Input
                                                                        type="date"
                                                                        name="duration"
                                                                        value={task.duration}
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row my-4">
                                                                <div className="col-lg-12">
                                                                    <div className="lg-form mb-0">
                                                                        <label className="form-label text-primary">Technology:</label>
                                                                        <Input
                                                                            placeholder="Technology" type="text"
                                                                            name="technology"
                                                                            value={task.technology}
                                                                            handleChange={handleChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row my-4">
                                                                <div className="col-lg-12">
                                                                    <div className="lg-form mb-0">
                                                                        <label className="form-label text-primary">Description:</label>
                                                                        <TextArea
                                                                            placeholder="description"
                                                                            handleChange={handleChange}
                                                                            value={task.description}
                                                                            name="description"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="row mt-4">
                                                                <div className="col-md-3">
                                                                    <button className="btn btn-primary btn-block text-white btn-user" type="submit" >UpdateTask</button>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <button className="btn btn-primary btn-block text-white btn-user" onClick={() => history.goBack(match.url)} >Back</button>
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
        </div>

    )
}

UpdateTask.propTypes = {

    updateTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task
})


export default connect(mapStateToProps, { updateTask })(withRouter(UpdateTask))
