import { combineReducers } from "redux";
import invite from './invite_reducer';
import date from './date_reducer';



const rootReducer = combineReducers ({
    invite,
    date
    
});

export default rootReducer;