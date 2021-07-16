import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { showTask } from '../../actions/task';
import Moment from 'moment'

const UserTask = ({ userId, showTask, task: { tasks }, }) => {

    React.useEffect(() => {
        showTask(userId)
    }, [showTask, userId])

    const tableStyle = {
        padding: '30px'
    }

    const datashow = tasks;
    const columns = [
        {
            title: 'Taskname', field: 'taskname'
        },

        {
            title: 'Date', field: 'createdAt', type: "date", dateSetting: { locale: "in" },
            render: rowData => Moment(rowData.createdAt).format('DD/MM/YYYY hh:mm')
        },
        {
            title: 'Duration(hour)', field: 'duration'
        }
    ];

    return (
        <div className="m-5">
            {datashow.length !== 0 &&
                <MaterialTable style={tableStyle}
                    title="Task Details"
                    data={datashow}
                    columns={columns}
                    detailPanel={rowData => {
                        return (
                            <div className="px-3 py-4 bg-light "> <span className="text-primary  h5">Task Description :- </span><hr /> <h6 className="text-dark">{rowData.description} </h6></div>
                        )
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    options={{
                        // grouping: true,
                        filtering: true,
                        headerStyle: {
                            backgroundColor: '#c8cbf47a',
                            color: '#000',
                            fontWeight: "bold"
                        },
                    }}
                />} </div>
    )
}

UserTask.propTypes = {

    auth: PropTypes.object.isRequired,
    showTask: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task
})

export default connect(mapStateToProps, { showTask })(withRouter(UserTask))
