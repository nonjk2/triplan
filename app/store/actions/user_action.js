import axios from 'axios';
import {
    SIGN_UP,
    SIGN_IN,
    AUTO_SIGN_IN
} from '../types';

export const autoSignIn = (refToken) =>{
    
    const request = axios({
        method:'post',
        url:`http://172.30.1.56:9090/social/autologin/kakao`,
        data :{
            refreshToken : refToken
        }
        
    })
    .then(response=>{
        console.log(response.data.data)
        return response.data.data
    })
    .catch(err => {console.log(err)
        return false
    })
    console.log(request)
    return{
        type : AUTO_SIGN_IN,
        payload : request
    }
} 




export function signIn(data){
    return{
        type:SIGN_IN,
        payload : {
            accessToken:data.accessToken ||false,
            refreshToken:data.refreshToken || false,
            email:data.email || false,
            nickname:data.nickname || false,
            aboutMe:data.aboutMe || false,
            nametag:data.nametag || false,
            // memberId:action.payload.memberId || false
        }
    }
}

export function signUp(data){
    return{
        type : SIGN_UP,
        payload : {
            email:'',
            refreshToken:data.refreshToken,
            nickname:'',
            aboutme:'',
            nametag:'',
            token:'',
        }
    }
}