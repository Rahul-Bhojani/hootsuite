import axois from 'axios';
import { setAlert } from './alert';
import * as  types from './types';


export const getCurrentProfile = () => async dispatch => {
    try {

        const res = await axois.get('http://localhost:5000/myprofile');

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

//get full staff details 
export const getProfilesByEmail = (email, history) => async dispatch => {
    history.push(`/staffDetails`)

    try {
        const res = await axois.get(`http://localhost:5000/profile/${email}`);

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

//get registered staff details
export const getAllProfiles = () => async dispatch => {

    dispatch({
        type: types.CLEAR_PROFILE
    })
    try {

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
// update current login user profile
export const updateProfile = (mainProfileFormData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const resformainprofile = await axois.patch('http://localhost:5000/profile', mainProfileFormData, config);

        dispatch({
            type: types.GET_PROFILE,
            payload: resformainprofile.data
        })
        dispatch(setAlert('Profile Updated', 'success'))

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

