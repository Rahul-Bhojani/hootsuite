import axois from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';

import * as  types from './types';

//get registered staff details
export const getAllProfiles = () => async dispatch => {
    //clear default profile
    dispatch({
        type: types.CLEAR_PROFILE
    })
    try {
        //get all registered staff details
        const res = await axois.get('http://localhost:5000/staff');
        dispatch({
            type: types.GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//get full staff details with userId
export const getProfilesById = (profile, history, staff = true) => async dispatch => {

    if (staff) {
        history.push('/userDetails')
    }
    console.log(profile);
    if (profile === null) return true
    try {
        const res = await axois.get(`http://localhost:5000/profile/${profile._id}`);

        dispatch({
            type: types.GET_PROFILE,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// update current login user profile
export const updateProfile = (mainProfileFormData, history) => async dispatch => {
    if (mainProfileFormData === null) return true

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axois.patch('http://localhost:5000/profile', mainProfileFormData, config);
        dispatch(loadUser())
        dispatch(setAlert('Profile Updated', 'success'))
        history.push('/profile');

    } catch (error) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
    }
}

//change password 
export const changePassword = passwordData => async dispatch => {
    if (passwordData === null) return true
    console.log(passwordData);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axois.patch('http://localhost:5000/password', passwordData, config);
        dispatch(setAlert('Password Change Sucessfully', 'success'))
        return true
    } catch (error) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
}

//get registered staff details
export const getCountData = () => async dispatch => {
    //clear default profile
    dispatch({
        type: types.CLEAR_COUNT
    })
    try {
        //get all registered staff details
        const res = await axois.get('http://localhost:5000/count');
        dispatch({
            type: types.GET_COUNT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//get full profile and task details
export const getFullDetails = () => async dispatch => {
    //clear default profile
    dispatch({
        type: types.CLEAR_COUNT
    })
    try {
        //get all registered staff details
        const res = await axois.get('http://localhost:5000/count');
        dispatch({
            type: types.GET_COUNT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
