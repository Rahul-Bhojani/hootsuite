import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskNav from '../navbar/taskNavbar';
import Input from '../formComponent/input';
import TextArea from '../formComponent/textArea';
import { addTask } from '../../actions/task'
import { connect } from 'react-redux'
import Alert from '../alert/alert'


const CreateTask = ({ addTask }) => {

    const [taskData, setTaskData] = useState({
        taskname: '',
        description: '',
        date: '',
        time: ''
    });
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        var d = new Date(taskData.date);

        const submitTask = {
            taskname: taskData.taskname,
            description: taskData.description,
            duration: d.toDateString() + " " + taskData.time + ":00"
        }
        const send = await addTask(submitTask);

        if (send) {
            document.user.reset();
        }
    }

    return (
        <div>
            <TaskNav />
            <div className="containers mx-5 mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-12 col-xl-12">
                        <div className="card shadow-lg o-hidden border-0 ">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-4">
                                            <h5 className="mb-4">
                                                Create New Task
                                        </h5>
                                            <hr />
                                            <Alert />
                                            <form name="user" onSubmit={handleSubmit} >
                                                <div className="row my-3">
                                                    <div className="col-lg-6">
                                                        <div className="lg-form mb-0">
                                                            <label className="form-label text-primary">Taskname:</label>
                                                            <Input
                                                                placeholder="Taskname" type="text"
                                                                name="taskname"
                                                                handleChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="lg-form mb-0">

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <label className="form-label text-primary">Date:</label>
                                                                    <Input
                                                                        type="date"
                                                                        name="date"
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <label className="form-label text-primary">Time:</label>
                                                                    <Input
                                                                        type="time"
                                                                        name="time"
                                                                        handleChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row my-3">
                                                    <div className="col-lg-12">
                                                        <div className="lg-form mb-0">
                                                            <label className="form-label text-primary">Description:</label>
                                                            <TextArea
                                                                placeholder="description"
                                                                handleChange={handleChange}
                                                                name="description"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <button className="btn btn-primary btn-block text-white btn-user" type="submit">Create Task</button>
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
    )
}


CreateTask.propTypes = {
    addTask: PropTypes.func.isRequired,
}

export default connect(null, { addTask })(CreateTask);
