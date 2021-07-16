import axios from 'axios';


//set x-auth-token
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;

    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken