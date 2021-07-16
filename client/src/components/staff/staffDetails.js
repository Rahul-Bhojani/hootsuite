import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfilesById, updateProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import UserTask from '../task/userTask';
import MaterialTable, { MTableToolbar } from 'material-table';
import Alert from '../alert/alert';
import Moment from 'moment';


const StaffDetails = ({ profile: { profile }, updateProfile, auth: { user }, history, match }) => {
    React.useEffect(() => {
        loadUser()
    }, [])
    let matchUser = false
    if (user) {
        if (user._id === (profile && profile._id)) {
            matchUser = true;
        }
    }
    const userArr = [{ ...profile }]
    const datashow = userArr;

    const columns = [
        { title: 'FirstName', field: 'firstname', render: rowData => rowData.firstname === null ? '-' : rowData.firstname },
        { title: 'LastName', field: 'lastname', render: rowData => rowData.lastname === null ? '-' : rowData.lastname },
        { title: 'Email', field: 'email', render: rowData => rowData.email === null ? '-' : rowData.email },
        // { title: 'Username', field: 'username' },
        { title: 'Designation', field: 'designation', render: rowData => rowData.designation === null ? '-' : rowData.designation },
        { title: 'Address', field: 'address', render: rowData => rowData.address === null ? '-' : rowData.address },
        { title: 'Birth Date', field: 'birthdate', type: 'date', render: rowData => rowData.birthdate === null ? '-' : Moment(rowData.birthdate).format('DD/MM/YYYY') },
        { title: 'Mobile No', field: 'mobileno', type: 'numeric', render: rowData => rowData.mobileno === null ? '-' : rowData.mobileno },
        { title: 'Office No', field: 'officeno', type: 'numeric', render: rowData => rowData.officeno === null ? '-' : rowData.officeno },
    ];
    const tableOptions = {
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
    }
    const tableStyle = {
        padding: '0px 30px 15px 30px'
    }
    return (
        <div>
            <div className="row m-0">
                <div className="col-sm-6 col-sm-offset-4">
                </div>
                <div className="col-sm-6 text-right">
                    <div className="form-group mx-5 my-0">
                        <button className="btn btn-primary" type="submit" onClick={() => history.goBack(match.url)}>Back</button>
                    </div>
                </div>
            </div>
            {matchUser ?
                <div className="my-4 mx-5">
                    <MaterialTable style={tableStyle} title="User Information"
                        components={{
                            Toolbar: props => (
                                <>
                                    <MTableToolbar {...props} />
                                    <Alert />
                                </>
                            )
                        }}
                        data={datashow}
                        columns={columns}
                        options={tableOptions}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        var dataUpdate = [...datashow];
                                        dataUpdate = newData;
                                        if (!(JSON.stringify(profile) === JSON.stringify(dataUpdate))) {
                                            updateProfile(dataUpdate);
                                            resolve();
                                        }
                                        else {
                                            resolve();
                                        }
                                    }, 1000)
                                }),
                        }}
                    />
                </div> :
                <div className="my-3 mx-5">
                    <MaterialTable style={tableStyle} title="User Information"
                        data={datashow}
                        columns={columns}
                        options={tableOptions}
                    />
                </div>

            }
            <UserTask userId={profile && profile._id} />

        </div>
    )
}

StaffDetails.propTypes = {
    getProfilesById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, { getProfilesById, updateProfile, loadUser })(withRouter(StaffDetails))
