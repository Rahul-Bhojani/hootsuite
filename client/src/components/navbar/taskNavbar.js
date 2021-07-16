import React from 'react'
import { Link } from 'react-router-dom'

const TaskNav = () => {
    return (
        <div className="mx-4">
            <Link className="btn btn-primary mx-4 mb-2" to="/listTask" role="button">Daily Update</Link>
            <Link className="btn btn-primary mx-4 mb-2" to="/myTask" role="button">Assigned Task</Link>

        </div>
    )
}

export default TaskNav
