import {
    PLAN_INSERT
} from '../types';

export function planToggleAction(data){
    return{
        type:PLAN_INSERT,
        payload : 
        {
            planToggle:data
        }
    }
}