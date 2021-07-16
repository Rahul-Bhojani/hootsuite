import React from 'react'
import HrSidebar from '../sideBar/hrSidebar'
import AdminNav from '../navbar/navAdmin'
import MaterialTable from 'material-table'
import Moment from 'moment'
import { myTask } from '../../actions/task'
import { connect } from 'react-redux'
import AdminSidebar from '../sideBar/adminSidebar';
import Navbar from '../navbar/navbar';
import Tasknav from '../navbar/taskNavbar';


const MyTask = ({ auth: { user }, task: { tasks, task, assignedUser }, myTask, props }) => {

    React.useEffect(() => {
        myTask(user)
    }, [myTask, user])

    const datashow = task.data;
    const columns = [
        {
            title: 'Taskname', field: 'taskname'
        },
        {
            title: 'Assigned Date', field: 'createdAt', type: "date", dateSetting: { locale: "in" }
            , render: rowData => Moment().format('DD-MM-YYYY')
        },
        {
            title: 'Duration', field: 'duration', type: "date", dateSetting: { locale: "in" },
            render: rowData => Moment(rowData.duration).format('DD-MM-YYYY')
        }
    ];

    const tableStyle = {
        padding: '30px',
        paddingTop: '0px',
        paddingBottom: '0px',

    }



    return (
        <div className="d-flex" id="wrapper">
            { user && user.role === 1 && <AdminSidebar />}
            { user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                {user && user.role === 1 && <AdminNav />}
                {user && user.role === 2 && <AdminNav />}
                {user && user.role === 3 && <Navbar />}
                <div className="container-fluids">
                    {datashow && datashow.length < 1 ?
                        <div class="form-group">
                            <div class="col-md-12 text-center">
                                <p className="p-5 mb-0 h4 text-danger">Task not assigned !!!</p>
                            </div>
                        </div>

                        :
                        <div className="mt-3"> {user && user.role === 3 && <Tasknav />}
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
                                }
                                }

                                onRowClick={async (event, rowData, togglePanel) => {

                                    return togglePanel();
                                }}
                                options={{
                                    actionsColumnIndex: -1,
                                    search: false,
                                    sorting: false,
                                    paging: false,
                                    showTitle: true,
                                    toolbar: true,
                                    headerStyle: {
                                        backgroundColor: '#c8cbf47a',
                                        color: '#000',
                                        fontWeight: "bold"
                                    }
                                }}
                            /></div>}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task,
})

export default connect(mapStateToProps, { myTask })(MyTask)
