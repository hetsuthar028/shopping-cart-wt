import axios from "axios"
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, CLEAR_USER } from "./userTypes"

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const fetchUser = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.get('http://localhost:8080/user/get/currentuser', {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((currentUserResp) => {
            console.log("GOT CURRENT USER");
            dispatch(fetchUserSuccess(currentUserResp.data.user));
        })
        .catch((err) => {
            dispatch(fetchUserFailure(err.response.data));
        })
    }
}

const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}

export default fetchUser;