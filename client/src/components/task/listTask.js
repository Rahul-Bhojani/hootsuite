import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { dailyUpdate, getDailyUpdate } from '../../actions/task'
import MaterialTable from 'material-table'
import TaskNav from '../navbar/taskNavbar';
import Alert from '../alert/alert';
import { setAlert } from '../../actions/alert'

import Input from "../formComponent/input";
import TextArea from "../formComponent/textArea";
import HrSidebar from '../sideBar/hrSidebar'
import AdminNav from '../navbar/navAdmin';
import Navbar from '../navbar/navbar';
import Moment from 'moment'

const ListTask = ({ auth: { user }, setAlert, task: { tasks, task: { data } }, dailyUpdate, getDailyUpdate, history }) => {


    React.useEffect(() => {
        getDailyUpdate(data && data[0]._id)
    }, [getDailyUpdate, data])

    const [formData, setFormData] = React.useState({
        task: '',
        hours: '',
        content: '',
    });


    const datashow = tasks;
    const columns = [
        {
            title: 'Date', field: 'createdAt', type: "date",
            render: rowData => Moment(rowData.createdAt).format('DD-MM-YYYY HH:mm:ss'),
            cellStyle: {
                width: '10%',
                border: '1px solid'
            },
            headerStyle: {
                width: '10%', border: '1px solid', textAlign: 'center'
            }, defaultSort: "desc",
        },
        {
            title: 'Task', render: rowData => data[0].taskname,
            cellStyle: {
                border: '1px solid', width: '35%',
            },
            headerStyle: {
                border: '1px solid', textAlign: 'center', width: '35%',
            }, sorting: false
        },
        {
            title: 'Hours', field: 'hours', type: "number", cellStyle: {
                width: '10%', border: '1px solid', textAlign: 'center'
            }, headerStyle: {
                width: '10%', border: '1px solid', textAlign: 'center'
            }, sorting: false
        },
        {
            title: 'Content', field: 'content', type: "string", cellStyle: {
                border: '1px solid', width: '35%'
            },
            headerStyle: {
                width: '35%', border: '1px solid', textAlign: 'center'
            }, sorting: false,
        },
    ];

    const tableStyle = {
        margin: '30px',
        paddingTop: '0px'
    }

    const handleChange = (e) => {

        setFormData(
            { ...formData, [e.target.name]: e.target.value }
        )
    }
    //submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        const word = formData.content.split(" ").length;
        if (!formData.task) return setAlert('plese Select task', 'danger')
        if (word < 5) {
            return setAlert('content must be 5 word !!', 'danger')
        }
        const confirm = window.confirm("Make sure all value is correct latter can't update")
        if (confirm) {
            const send = await dailyUpdate(formData, history);
            if (send === true) {
                document.user.reset()
                return getDailyUpdate(data[0]._id)
            }
            if (send === 'Today Update is alredy created') {
                return document.user.reset()
            }
        }
    }


    return <div>

        <div className="d-flex" id="wrapper">
            {user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                {user && user.role === 2 && <AdminNav />}
                {user && user.role === 3 && <Navbar />}
                <div className="mt-3">
                    {user && user.role === 3 && <TaskNav />}

                </div>
                <div className="mx">
                    {user && user.role === 2 ? <div className="mt-4 mx-5 mb-3 text-left">
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Add Update
                        </button>
                    </div> : <div className="mt-4 mx-5 mb-3 text-right">
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Add Update
                        </button>
                    </div>}

                    {tasks.length !== 0 ?
                        <MaterialTable title="Update Details" style={tableStyle}
                            data={datashow}
                            columns={columns}
                            options={{
                                search: false,

                                maxBodyWidth: "30px",
                                headerStyle: {
                                    backgroundColor: '#c8cbf47a',
                                    color: '#000',
                                    fontWeight: "bold"
                                }
                            }}
                        />
                        : <h1 className="text-center h5 text-danger">No Update for assined Task </h1>}
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Add Update</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Alert />
                                    <form name="user" onSubmit={handleSubmit}>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="col-form-label text-primary">Task <span className="text-danger">*</span></label>

                                                    <select className="form-control" name="task" onChange={handleChange} required>
                                                        <option selected value="null">select task</option>
                                                        {data && <option value={data[0]._id}>{data[0].taskname.substring(0, 100) + '...'}</option>}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="col-form-label text-primary">Number of hours <span className="text-danger">*</span></label>
                                                    <Input
                                                        placeholder="Number of hours" type="number"
                                                        name="hours"
                                                        handleChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="col-form-label text-primary">Update content <span className="text-danger">*</span></label>
                                                    <TextArea
                                                        placeholder="Update content" type="text"
                                                        name="content"
                                                        handleChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Save</button>
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

}
ListTask.propTypes = {

    auth: PropTypes.object.isRequired,
    getDailyUpdate: PropTypes.func.isRequired,
    dailyUpdate: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task
})

export default connect(mapStateToProps, { getDailyUpdate, setAlert, dailyUpdate })(withRouter(ListTask))
