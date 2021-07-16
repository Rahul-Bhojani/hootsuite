import React, { useRef } from 'react';
import ReactPasswordToggleIcon from 'react-password-toggle-icon';
import HrSidebar from '../sideBar/hrSidebar'
import AdminNav from '../navbar/navAdmin'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert'
import Alert from '../alert/alert';
import { changePassword } from '../../actions/profile';
import AdminSidebar from '../sideBar/adminSidebar';
import Navbar from '../navbar/navbar';


const ChangePassword = ({ auth: { user }, setAlert, changePassword }) => {

    let inputRef1 = useRef();
    let inputRef2 = useRef();
    let inputRef3 = useRef();


    const showIcon = () => <i class="bi bi-eye-slash-fill"></i>;
    const hideIcon = () => <i class="bi bi-eye-fill"></i>
    const [userData, setUserData] = React.useState({
        oldPassword: '',
        password: '',
        cpassword: '',
    })

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (userData.oldPassword === userData.password) {
            setAlert('New passwod must be diffrent from old password', 'danger')
            return
        }
        if (userData.password.length < 6) {
            setAlert('Password length must be 6', 'danger')
            return
        }
        if (userData.password !== userData.cpassword) {
            setAlert('plese enter valid Confirm Password', 'danger')
            return
        }
        const res = await changePassword(userData);
        if (res) {
            document.user.reset()
        }

    }

    return (
        <div className="d-flex" id="wrapper">
            { user && user.role === 1 && <AdminSidebar />}
            { user && user.role === 2 && <HrSidebar />}
            <div id="page-content-wrapper">
                {user && user.role === 1 && <AdminNav />}
                {user && user.role === 2 && <AdminNav />}
                {user && user.role === 3 && <Navbar />}
                <div className="container mt-5">
                    <Alert />
                    <div className="card m-auto p-4">
                        <form name="user" onSubmit={handleSubmit}>
                            <div className="col fa mt-2" style={{ position: "relative", display: "block" }}>
                                <span className="text-primary h6" >Old Password : <span className="text-danger">*</span></span>
                                <input ref={inputRef1} type="password" required
                                    placeholder="Enter Old password" name="oldPassword" onChange={handleChange}
                                    style={{ display: "block", width: "100%", border: "0px", borderBottom: "1px solid grey", padding: "5px", fontSize: "20px", outline: "none" }} />
                                <ReactPasswordToggleIcon
                                    inputRef={inputRef1}
                                    showIcon={showIcon}
                                    hideIcon={hideIcon}
                                />
                                <br />
                            </div>
                            <div className="col fa mt-2" style={{ position: "relative", display: "block" }}>
                                <span className="text-primary h6">New Password : <span className="text-danger">*</span></span>
                                <input ref={inputRef2} type="password" name="password" required
                                    placeholder="Enter New password" onChange={handleChange}
                                    style={{ display: "block", width: "100%", border: "0px", borderBottom: "1px solid grey", padding: "5px", fontSize: "20px", outline: "none" }} />
                                <ReactPasswordToggleIcon
                                    inputRef={inputRef2}
                                    showIcon={showIcon}
                                    hideIcon={hideIcon}
                                />

                                <br />

                            </div>
                            <div className="col fa mt-2" style={{ position: "relative", display: "block" }}>
                                <span className="text-primary h6">Confirm New Password : <span className="text-danger">*</span></span>
                                <input ref={inputRef3} type="password" onChange={handleChange}
                                    placeholder="Enter New Confirm password" name="cpassword" required
                                    style={{ display: "block", width: "100%", border: "0px", borderBottom: "1px solid grey", padding: "5px", fontSize: "20px", outline: "none" }} />
                                <ReactPasswordToggleIcon
                                    inputRef={inputRef3}
                                    showIcon={showIcon}
                                    hideIcon={hideIcon}
                                />
                                <br />

                            </div>
                            <div className="row mt-5 ml-2">
                                <div className="col-md-3">
                                    <button className="btn btn-primary btn-block text-white btn-user" type="submit">Change Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { setAlert, changePassword })(ChangePassword);