import { combineReducers } from 'redux';
import userReducer from './userReducer';
import provReducer from './provReducer';
import utilReducer from './utilReducer';

export default combineReducers({
    users: userReducer,
    prov: provReducer,
    utils: utilReducer
});