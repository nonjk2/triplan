import {
    PLAN_NAME
} from '../types';

export function plannameupdate(data){
    return{
        type:PLAN_NAME,
        payload : {
            plannameupdate : data.planname
        }
    }
}