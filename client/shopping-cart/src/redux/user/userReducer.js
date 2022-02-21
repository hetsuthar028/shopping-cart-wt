import { CLEAR_USER, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userTypes"

const initialUserState = {
    loading: false,
    user: {},
    error: '',
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case FETCH_USER_SUCCESS: {
            return {
                loading: false,
                user: action.payload,
                error: ''
            }
        }

        case FETCH_USER_FAILURE: {
            return {
                loading: false,
                user: {},
                error: action.payload,
            }
        }

        case CLEAR_USER: {
            return {
                ...state,
                user: {},
                error: ''
            }
        }

        default: {
            return state
        }
    }
}

export default userReducer;