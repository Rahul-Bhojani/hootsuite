import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProfiles, getProfilesById } from '../../actions/profile'
import MaterialTable from 'material-table'
import Input from "../formComponent/input";
import TextArea from "../formComponent/textArea";
import QRCode from "qrcode";

const Dashboard = ({ history, getAllProfiles, getProfilesById, profile: { profiles }, btn, titleValue, auth: { user }, match }) => {

    const [userData, setFormData] = React.useState({});
    React.useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sort = urlParams.get('sort')

    const data = profiles;
    let columns = [
        { title: 'Name', field: 'firstname', render: rowData => rowData.firstname + " " + rowData.lastname, grouping: false },
        // { title: 'LastName', field: 'lastname' },
        { title: 'Email', field: 'email', grouping: false },
        { title: 'Designation', field: 'designation' },

        { title: 'Mobile No', field: 'mobileno', grouping: false },
        {
            title: 'Action', field: 'lastname', grouping: false, filtering: false, render: rowData => (
                <button type="button" class="btn btn-primary" title="See Details" data-toggle="modal" data-target="#exampleModal">
                    <i class="bi bi-eye-fill"></i>
                </button>)
        },
    ];
    if (sort) {
        columns = [
            { title: 'Name', field: 'firstname', render: rowData => rowData.firstname + " " + rowData.lastname, grouping: false },
            // { title: 'LastName', field: 'lastname' },
            { title: 'Email', field: 'email', grouping: false },
            { title: 'Designation', field: 'designation', defaultGroupOrder: 0 },
            { title: 'Mobile No', field: 'mobileno', grouping: false },
            {
                title: 'Action', field: 'lastname', grouping: false, filtering: false, render: rowData => (
                    <button type="button" class="btn btn-primary" title="See Details" data-toggle="modal" data-target="#exampleModal" >
                        <i class="bi bi-eye-fill"></i>
                    </button>)
            },
        ];
    }
    if (user) {

        if (user.role === 1) {
            columns[3] = { title: 'Role', field: 'role', lookup: { 1: 'Admin', 2: 'HR manager', 3: 'Employee' } };
        }
    }
    const tableStyle = {
        padding: '30px'
    }

    var imf = null;
    var styles = {
        height: '200px',
        width: '200px',
        border: 'none',
        display: 'none'
    }

    const showImg = () => {
        const styleImg = document.getElementById('qrc').style.display
        if (styleImg === 'none') document.getElementById('qrc').style.display = ''
        else {
            document.getElementById('qrc').style.display = 'none'
        }

    }

    return <div className="">
        {profiles && (profiles.length < 1) ? <div className="card">
            <div class="form-group">
                <div class="col-md-12 text-center">
                    {titleValue ? <p className="p-5 mb-0 h4">{titleValue}</p> : null}
                    {btn ? <div> <p className="h4 my-3">No records found.</p> <button id="singlebutton" name="singlebutton" class="btn btn-primary center-block" onClick={() => history.goBack(match.url)}>
                        <i class="bi bi-arrow-left-short"></i>   Back
                    </button></div> : null}
                </div>
            </div>
        </div> : <>
            <div class="form-group">

                <div class="col-md-12 text-right">
                    {btn ? <div> <button id="singlebutton" name="singlebutton" class="btn btn-primary center-block" onClick={() => history.goBack(match.url)}>
                        <i class="bi bi-arrow-left-short"></i>   Back
                    </button></div> : null}
                </div>
            </div>

            <MaterialTable title="Staff details" style={tableStyle}
                data={data}
                columns={columns}
                // actions={[
                //     {
                //         icon: 'visibility',
                //         tooltip: 'Show Profile',
                //         onClick: (event, rowData) => (
                //             getProfilesById(rowData, history))
                //     }
                // ]}
                onRowClick={((evt, selectedRow) => {
                    // getProfilesById(selectedRow, history)
                    setFormData(selectedRow)
                })}
                options={{
                    grouping: true,
                    filtering: true,
                    actionsColumnIndex: -1,
                    headerStyle: {
                        backgroundColor: '#c8cbf47a',
                        color: '#000',
                        fontWeight: "bold"
                    },
                }}
            /> </>}
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">User Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* {userData !== null && userData} */}
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-primary">First Name:</label>
                                        <Input
                                            placeholder="firstname" type="text"
                                            name="firstname"
                                            value={userData && userData.firstname}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-primary">Last Name:</label>
                                        <Input
                                            placeholder="lastname" type="text"
                                            name="lastname"
                                            value={userData && userData.lastname}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-primary">User Name:</label>
                                        <Input
                                            placeholder="username" type="text"
                                            name="username"
                                            value={userData && userData.username}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-primary">Email:</label>
                                        <Input
                                            placeholder="email" type="text"
                                            name="email"
                                            value={userData && userData.email}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-primary">Designation:</label>
                                        <Input
                                            placeholder="designation" type="text"
                                            name="designation"
                                            value={userData && userData.designation}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-primary">Mobile Number:</label>
                                        <Input
                                            placeholder="mobileno" type="text"
                                            name="mobileno"
                                            value={userData && userData.mobileno}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-form-label text-primary">Address:</label>
                                <TextArea
                                    placeholder="Address"
                                    name="address"
                                    value={userData && userData.address}
                                    disabled={true}
                                />
                            </div>
                        </form>

                        {

                            QRCode.toDataURL([
                                { data: userData.firstname + " " + userData.lastname + " ", mode: 'byte' },
                                { data: userData.mobileno, mode: 'numeric' },
                                { data: " " + userData.email, mode: 'byte' },
                            ], {
                                color: {
                                    dark: '#000',  // Blue dots
                                    light: '#0000' // Transparent background
                                }
                            },
                                (err, url) => imf = url)
                        }
                        <div className="text-center" >
                            <img src={imf} alt="Qr code" id="qrc" className="text-center" style={styles} />
                        </div>
                    </div>

                    <div className="modal-footer">

                        {user && user.email !== userData.email && <button className="btn btn-outline-primary" onClick={showImg}>Show QR Code</button>}

                        {user && user.role === 1 && <button className="btn btn-outline-primary mr-3" data-dismiss="modal" onClick={() => getProfilesById(userData, history)}>Show More Details </button>}
                        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                        {user && user.email === userData.email && <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => history.push('/profile')}>Edit Profile</button>}
                    </div>
                </div>
            </div>
        </div>
    </div>
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired,
    getProfilesById: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getAllProfiles, getProfilesById })(withRouter(Dashboard))
