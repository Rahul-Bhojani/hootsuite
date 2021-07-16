import * as types from '../actions/types';

const initialState = {
    tasks: [],
    task: [],
    loading: true,
    assignedUser: []
}

const task = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SHOW_TASK:
            return {
                ...state, tasks: payload, loading: false
            }
        case types.GET_ASSOCIATED_USER:
            return {
                ...state, assignedUser: payload, loading: false
            }
        case types.SAVE_TASK:
        case types.UPDATE_TASK:
            return {
                ...state, task: payload, loading: false
            }

        default:
            return state
    }
};


export default task