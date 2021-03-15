import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { getAllProfiles, getProfilesByEmail } from '../../actions/profile'
import MaterialTable from 'material-table'



const Dashboard = ({ history, getAllProfiles, getProfilesByEmail, profile: { profiles } }) => {


    React.useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])

    const data = profiles;
    const columns = [
        { title: 'FirstName', field: 'firstname' },
        { title: 'LastName', field: 'lastname' },
        { title: 'Email', field: 'email' },
    ];

    const tableStyle = {
        padding: '30px'
    }


    return <div className="mx-5">
        <MaterialTable title="Staff details" style={tableStyle}
            data={data}
            columns={columns}
            actions={[
                {
                    icon: 'visibility',
                    tooltip: 'Show Profile',
                    onClick: (event, rowData) => (
                        getProfilesByEmail(rowData.email, history)

                    )
                }
            ]}
            onRowClick={((evt, selectedRow) => (getProfilesByEmail(selectedRow.email, history)))}

            options={{
                actionsColumnIndex: -1,
                headerStyle: {
                    backgroundColor: '#c8cbf47a',
                    color: '#000',
                    fontWeight: "bold"

                },

            }}
        /></div>



}
Dashboard.propTypes = {

    auth: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired,
    getProfilesByEmail: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles, getProfilesByEmail })(withRouter(Dashboard))
