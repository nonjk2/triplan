import { combineReducers } from "redux";
import invite from './invite_reducer';
import date from './date_reducer';
import user from './user';
import plan from './plan_reducer'



const rootReducer = combineReducers ({
    invite,
    date,
    user,
    plan,    
});

export default rootReducer;