import {
    INVITE_INSERT,
    INVITE_REMOVE
} from '../types';

const initialState = [
    {
        nickname: 'asdadsasdasd',
        image_id: 'this is id',    
        freinds_id: 1,
        isSelected : false,
    }
]

export default function(state = initialState , action) {
    switch(action.type){
        case INVITE_INSERT:
            return state.concat(action.payload)
                
        case INVITE_REMOVE:
            return initialState
                

        default :
            return state    
    }
}