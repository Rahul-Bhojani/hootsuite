import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
// import Footer from './components/footer/footer'
import Home from './components/dashboard/home';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import AddStaff from './components/staff/addStaff';
import StaffList from './components/staff/staffviewAdmin';
import AddTask from './components/task/addTask'
import ShowAllTask from './components/task/showAllTask'
import UpdateTask from './components/task/updateTask';
import AssignTask from './components/task/assignTask';
import TaskUser from './components/task/taskUser';
import MyTask from './components/task/myTask';
import ListTask from './components/task/listTask';
import UserDetails from './components/staff/userDetails';

import Profile from './components/profile/profile'
import ChangePassword from './components/profile/changePassword'


if (localStorage.token) setAuthToken(localStorage.token)

//YMC6669329
const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path='/login' component={Login} />
            {/* Dashbord According to role */}
            <PrivateRoute exact path='/' component={Home} />
            {/* Add Staff member for admin  */}
            <PrivateRoute exact path='/addStaff' component={AddStaff} />
            {/* List of Staff members*/}
            <PrivateRoute exact path='/staff' component={StaffList} />
            {/* Create Task for admin*/}
            <PrivateRoute exact path='/addTask' component={AddTask} />
            {/* show all task created by admin */}
            <PrivateRoute exact path='/showAllTask' component={ShowAllTask} />
            {/* update task in admin */}
            <PrivateRoute exact path='/updateTask' component={UpdateTask} />
            {/* Assign task to user */}
            <PrivateRoute exact path='/assignTask' component={AssignTask} />
            {/* list of staff for specified task */}
            <PrivateRoute exact path='/taskUser' component={TaskUser} />
            {/* show My task List */}
            <PrivateRoute exact path='/myTask' component={MyTask} />
            <PrivateRoute exact path='/listTask' component={ListTask} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/change-password' component={ChangePassword} />

            <PrivateRoute exact path='/userDetails' component={UserDetails} />

            {/* <Route exact path='/register' component={Register} /> */}
            {/* <PrivateRoute exact path='/staffDetails' component={StaffDetails} /> */}
            {/* <PrivateRoute exact path='/staff' component={ListStaff} /> */}
            {/* <PrivateRoute exact path='/task' component={CreateTask} /> */}

          </Switch>
          {/* <Footer /> */}
        </Fragment>
      </BrowserRouter>
    </Provider>
  )
}
export default App;
