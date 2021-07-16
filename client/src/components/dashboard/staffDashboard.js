import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar'
// import Update from '../../utils/update.png'

const StaffDashboard = () => {

    const styles = {
        height: '250px',
    }

    return (
        <>
            <Navbar />
            <div className="mt-5">
                <div id="cards_landscape_wrap-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2">
                                <div className="card">
                                    <img className="card-img-top" src="https://www.userlytics.com/front/img/home/hero-right.svg" alt="Card" style={styles} />
                                    <div className="card-body">
                                        <h5 className="card-title">Staff Dashboard</h5>
                                        <p className="card-text">Find Details of staff members and see full profile details.</p>
                                        <Link to="/staff" className="btn btn-primary">Go to Dashboard</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2">
                                <div className="card">
                                    <img className="card-img-top" src="https://mytasqr.com/assets/How-to-schedule-a-task.png" style={styles} alt="Card" />
                                    <div className="card-body">
                                        <h5 className="card-title">Task</h5>
                                        <p className="card-text">Create Task and show all tasks list also update tasks</p>
                                        <Link to="/myTask" className="btn btn-primary">Go to Task</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2">
                                <div className="card">
                                    <img className="card-img-top" src={Update} style={styles} alt="Card" />
                                    <div className="card-body">
                                        <h5 className="card-title">Daily Update</h5>
                                        <p className="card-text">Create daily update on tasks</p>
                                        <Link to="/listTask" className="btn btn-primary">Go to Updates</Link>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffDashboard;