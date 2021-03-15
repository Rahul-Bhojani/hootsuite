import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/navbar/navbar';
import Login from './components/auth/login'
import Register from './components/auth/register'
import StaffDetails from './components/staff/staffDetails'

import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import Dashboard from './components/dashboard/dashboard'
import Profile from './components/profile/profile'

import PrivateRoute from './components/routing/PrivateRoute'


import { Provider } from 'react-redux';
import store from './store'

if (localStorage.token) setAuthToken(localStorage.token)


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          {/* <Alert /> */}

          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/staffDetails' component={StaffDetails} />
            <PrivateRoute exact path='/staff' component={Dashboard} />
            <PrivateRoute exact path='/profile' component={Profile} />

          </Switch>

        </Fragment>
      </BrowserRouter>
    </Provider>
  )
}
export default App;
