import axios from 'axios';
import { setAlert } from './alert';
import * as types from './types';
import setAuthToken from '../utils/setAuthToken';

//For new staff registration action
export const register = ({ firstname, lastname, username, email, mobileno, role, designation }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    role = parseInt(role)

    const body = JSON.stringify({ firstname, lastname, username, email, mobileno, role, designation });

    try {
        const res = await axios.post('http://localhost:5000/register', body, config);
        dispatch(setAlert(res.data.msg, 'success', 3000))
    }
    catch (error) {
        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        // console.clear()
        return false;
    }
    return true
}

//staff login 
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password });


    try {
        const res = await axios.post('http://localhost:5000/login', body, config);

        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser())


    } catch (error) {
        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        dispatch({
            type: types.LOGIN_FAIL
        })
        console.clear()
    }
}

//get currnet authnticated user data and set x-auth-token
export const loadUser = () => async dispatch => {

    if (localStorage.token) setAuthToken(localStorage.token)

    try {
        const res = await axios.get('http://localhost:5000/auth');
        dispatch({
            type: types.USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: types.AUTH_ERROR
        })
        console.clear()
    }
}

//logout current logged in user
export const logout = () => dispatch => {
    dispatch({
        type: types.CLEAR_PROFILE
    })
    dispatch({
        type: types.LOGOUT
    })
}

