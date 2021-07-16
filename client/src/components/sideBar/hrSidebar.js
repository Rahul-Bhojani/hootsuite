import React from 'react'
import $ from 'jquery';
import { Link } from 'react-router-dom';

const HrSidebar = () => {

    return (
        <div className="bg-secondary border-right" id="sidebar-wrapper">
            <div className="sidebar-heading bg-primary text-white ">HR Dashboard</div>
            <div className="list-group list-group-flush mt-2">
                <Link to="/" className="list-group-item list-group-item-action bg-secondary text-white px-5">Dashboard</Link>
                <p className="h5 px-3 py-2 bg-dark text-white border-bottom border-top">Staff</p>
                <Link to="/addStaff" className="list-group-item list-group-item-action bg-secondary text-white px-5"><i className="bi bi-person-plus mr-3"></i> Create Staff </Link>
                <Link to="/staff" className="list-group-item list-group-item-action bg-secondary text-white px-5"><i className="bi bi-people mr-3"></i> List Staff</Link>
                <p className="h5 px-3 py-2 bg-dark text-white border-bottom border-top">Task</p>
                <Link to="/addTask" className="list-group-item list-group-item-action bg-secondary text-white px-5"><i className="bi bi-calendar2-plus mr-3"></i>  Create Task</Link>
                <Link to="/showAllTask" className="list-group-item list-group-item-action bg-secondary text-white px-5"><i className="bi bi-journal-bookmark mr-3"></i>  List Task</Link>
                <Link to="/myTask" className="list-group-item list-group-item-action bg-secondary text-white px-5"><i className="bi bi-clipboard-check mr-3"></i>  My Task</Link>
                {/* <Link to="/listTask" className="list-group-item list-group-item-action bg-secondary text-white px-5"><i className="bi bi-card-checklist mr-3"></i>  Update</Link> */}

            </div>
        </div>
    )
}
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

export default HrSidebar;
