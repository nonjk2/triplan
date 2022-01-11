import { combineReducers } from "redux";
import invite from './invite_reducer';
import date from './date_reducer';
import user from './user';



const rootReducer = combineReducers ({
    invite,
    date,
    user
    
});

export default rootReducer;