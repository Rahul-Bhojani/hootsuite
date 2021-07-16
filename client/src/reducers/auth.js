import * as types from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}
const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {

        //set token if login sucess
        case types.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        //set current authnticated user data
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        //remove token from localStorage and handle auth and login fail error also logout user
        case types.AUTH_ERROR:
        case types.LOGIN_FAIL:
        case types.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };

        default:
            return state;
    }
};

export default auth;