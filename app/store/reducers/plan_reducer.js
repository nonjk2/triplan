import {
    PLAN_INSERT
} from '../types';

const initialState = [
    {
        planToggle : false,
    }
]

export default function(state = initialState , action) {
    switch(action.type){
        case PLAN_INSERT:
            return {
                toggle : {
                    planToggle : action.payload.planToggle,
            }}
                
        default :
            return state    
    }
}