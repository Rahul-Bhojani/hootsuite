import axois from 'axios';
import { setAlert } from './alert';
import * as  types from './types';

//Create new task
export const addTask = (taskData) => async dispatch => {
    console.log("action", taskData);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axois.post('http://localhost:5000/task', taskData, config);
        dispatch(setAlert('Task Added Sucessfully', 'success'))


    } catch (error) {

        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
    return true
}

// get all task
export const showTask = () => async dispatch => {

    try {
        const res = await axois.get(`http://localhost:5000/task/`);
        dispatch({
            type: types.SHOW_TASK,
            payload: res.data
        })
        return true
    } catch (error) {

        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
}

//delete task
export const deleteTask = taskId => async dispatch => {
    try {

        const res = await axois.delete(`http://localhost:5000/task/${taskId}`);
        dispatch({
            type: types.SHOW_TASK,
            payload: res.data
        })
        return true

    } catch (error) {

        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
}

//save task for task information
export const saveTask = (taskData) => async dispatch => {
    dispatch({
        type: types.SAVE_TASK,
        payload: taskData
    })
}

//show user with that task information
export const userTask = (taskData) => async dispatch => {

    if (taskData === null) return true

    try {
        const res = await axois.get(`http://localhost:5000/userListTask/${taskData._id}`);
        dispatch({
            type: types.GET_ASSOCIATED_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: types.GET_ASSOCIATED_USER_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//assigned task
export const assignTask = (taskData) => async dispatch => {
    if (taskData.userId == null) {
        dispatch(setAlert('Plese select User', 'danger'))
        return true
    }
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axois.patch(`http://localhost:5000/task/${taskData.userId}/${taskData.taskId}`, taskData, config);
        dispatch(setAlert('Task Added Sucessfully', 'success'))

    } catch (error) {

        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
    return true
}

//list of user perticular task
export const assignedTask = (taskData) => async dispatch => {

    if (taskData === null) return true

    try {
        const res = await axois.get(`http://localhost:5000/assignedTask/${taskData._id}`);
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

//get my task
export const myTask = (user) => async dispatch => {

    if (user === null) return true

    console.log(user);
    try {
        const res = await axois.get(`http://localhost:5000/task/myTask`);
        dispatch({
            type: types.SAVE_TASK,
            payload: res
        })
    } catch (error) {
        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
}


//get user task
export const userDetailTask = (user) => async dispatch => {

    if (user === null) return true

    console.log(user);
    try {
        const res = await axois.get(`http://localhost:5000/task/userTask/${user._id}`);
        dispatch({
            type: types.SAVE_TASK,
            payload: res.data
        })
    } catch (error) {
        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
}

//update task
export const updateTask = (taskData) => async dispatch => {


    if (taskData === null) return true

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axois.patch(`http://localhost:5000/task/${taskData._id}`, taskData, config);
        dispatch(setAlert('Task Updated', 'success'))

    } catch (error) {

        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
}

//daily update
export const dailyUpdate = (taskData) => async dispatch => {
    console.log("action", taskData);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axois.post('http://localhost:5000/dailyUpdate', taskData, config);
        dispatch(setAlert('Task Added Sucessfully', 'success'))
    } catch (error) {

        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return err
    }
    return true
}

export const getDailyUpdate = (taskId) => async dispatch => {

    try {
        const res = await axois.get(`http://localhost:5000/dailyUpdate/${taskId}`);
        dispatch({
            type: types.SHOW_TASK,
            payload: res.data
        })
        return true
    } catch (error) {

        const err = error.response.data.msg;
        if (err) {
            dispatch(setAlert(err, 'danger'))
        }
        return false
    }
}