import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { showTask, deleteTask, userTask, saveTask } from '../../actions/task'
import MaterialTable from 'material-table'
import Moment from 'moment'
import AdminSidebar from '../sideBar/adminSidebar';
import HrSidebar from '../sideBar/hrSidebar'

import AdminNav from '../navbar/navAdmin'

const ShowAllTask = ({ showTask, auth: { user }, task: { tasks, task, assignedUser }, deleteTask, userTask, saveTask, history }) => {

    React.useEffect(() => {
        showTask()
    }, [showTask, user])

    const datashow = tasks;
    const columns = [
        {
            title: 'Taskname', field: 'taskname'
        },
        {
            title: 'Date', field: 'createdAt', type: "date", dateSetting: { locale: "in" }
            , render: rowData => Moment(rowData.createdAt).format('DD-MM-YYYY')
        },
        {
            title: 'Duration', field: 'duration', type: "date", dateSetting: { locale: "in" },
            render: rowData => Moment(rowData.duration).format('DD-MM-YYYY')
        },
        {
            title: 'Assign Task', grouping: false, filtering: false, render: rowData => {

                return <button type="button" class="btn btn-primary m-0" title="See Details" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => history.push('/assignTask')} >
                    Assign Task
                </button>
            }, cellStyle: {
                width: "15%"
            }
        },
    ];

    const tableStyle = {
        padding: '30px'
    }

    return <div>
        <div className="d-flex" id="wrapper">
            {user && user.role === 1 && <AdminSidebar />}
            {user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                <AdminNav user={user} />
                <div className="container-fluid mt-5">
                    {tasks.length !== 0 ?
                        <MaterialTable title="Task Details" style={tableStyle}
                            data={datashow}
                            columns={columns}
                            detailPanel={rowData => {
                                return (
                                    <div className="px-3 py-4 bg-light border">
                                        {rowData.technology && <div className="mb-3"><span className="text-primary h5">Technology :-
                                            <span className="text-dark h6"> {rowData.technology}
                                            </span></span><hr /></div>}
                                        <span className="text-primary  h5">
                                            Task Description :- </span>
                                        <h6 className="text-dark mt-2">{rowData.description}
                                        </h6>
                                    </div>
                                )
                            }}
                            editable={{
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            deleteTask(oldData._id)
                                            window.alert("Task Deleted Successfully")
                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                            actions={[
                                // {
                                //     icon: 'visibility',
                                //     tooltip: 'Show task',
                                //     onClick: (event, rowData) => {
                                //         console.log(rowData)
                                //         saveTask(rowData)
                                //         history.push('/taskUser')
                                //     }
                                // },
                                {
                                    icon: 'create',
                                    tooltip: 'Edit task',
                                    onClick: (event, rowData) => {
                                        saveTask(rowData)
                                        history.push('/updateTask')
                                    }
                                },
                            ]}
                            onRowClick={async (event, rowData, togglePanel) => {
                                await saveTask(rowData);
                                await userTask(rowData);
                                return togglePanel();
                            }}
                            options={{
                                filtering: true,
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#c8cbf47a',
                                    color: '#000',
                                    fontWeight: "bold"
                                }
                            }}
                        />
                        : <h1>No task Created </h1>}
                </div>
            </div>
        </div>
    </div>
}
ShowAllTask.propTypes = {
    auth: PropTypes.object.isRequired,
    showTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    saveTask: PropTypes.func.isRequired,
    userTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task,
    assignedUser: state.assignedUser
})

export default connect(mapStateToProps, { showTask, deleteTask, saveTask, userTask })(withRouter(ShowAllTask))
