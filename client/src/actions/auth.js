import axios from 'axios';
import { setAlert } from './alert'
import * as types from './types';
import setAuthToken from '../utils/setAuthToken'

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


export const register = ({ firstname, lastname, username, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ firstname, lastname, username, email, password });
    try {

        const res = await axios.post('http://localhost:5000/register', body, config);

        dispatch(setAlert(res.data.msg, 'success', 5000))

    } catch (error) {
        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        console.clear()
        return false;
    }
    return true
}


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

export const logout = () => dispatch => {
    dispatch({
        type: types.CLEAR_PROFILE
    })
    dispatch({
        type: types.LOGOUT
    })
}