import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { assignedTask } from '../../actions/task'
import AdminSidebar from '../sideBar/adminSidebar'
import AdminNav from '../navbar/navAdmin'
import ListStaff from '../staff/listStaff'

const TaskUser = ({ auth: { user }, task: { task }, assignedTask }) => {

    useEffect(() => {
        assignedTask(task)
    }, [assignedTask, task])
    return <div>
        <div className="d-flex" id="wrapper">
            <AdminSidebar />
            <div id="page-content-wrapper">
                <AdminNav user={user} />
                <div className="container-fluid mt-5">
                    <ListStaff />
                </div>
            </div>
        </div>
    </div>
}
TaskUser.propTypes = {
    auth: PropTypes.object.isRequired,

    assignedTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task
})

export default connect(mapStateToProps, { assignedTask })(withRouter(TaskUser))
