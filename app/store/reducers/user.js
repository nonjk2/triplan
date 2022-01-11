import {
    SIGN_IN,
    SIGN_UP,
    AUTO_SIGN_IN
    
} from '../types';



export default function(state = {} , action) {
    switch(action.type){
        case SIGN_IN:
            return {
                ...state,
                auth : {
                    refreshToken:action.payload.refreshToken || false, 
                    email:action.payload.email || false,
                    nickname:action.payload.nickname || false,
                    aboutme:action.payload.aboutme || false,
                    nametag:action.payload.nametag || false,
                    token:action.payload.token || false,

                }
            }
            case SIGN_UP:
            return {
                ...state,
                auth : {
                    refreshToken:action.payload.refreshToken || false, 
                    email:action.payload.email || false,
                    nickname:action.payload.nickname || false,
                    aboutme:action.payload.aboutme || false,
                    nametag:action.payload.nametag || false,
                    token:action.payload.token || false,

                }
            }
            case AUTO_SIGN_IN:
            return {
                ...state,
                auth : {
                    refreshToken:action.payload.refreshToken || false, 
                    userId:action.payload.userId || false,
                    token:action.payload.token || false,
                    email:action.payload.email || false,
                    nickname:action.payload.nickname || false,
                    aboutme:action.payload.aboutme || false,
                    nametag:action.payload.nametag || false,

                }
            }
                
        default :
            return state    
    }
}