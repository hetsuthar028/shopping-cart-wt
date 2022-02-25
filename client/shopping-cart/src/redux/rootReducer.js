import { combineReducers } from 'redux';
import bannerReducer from './banner/bannerReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    banner: bannerReducer,
});

export default rootReducer;