import {
    SIGN_UP,
    SIGN_IN,
    AUTO_SIGN_IN
} from '../types';

export const autoSignIn = (refToken) =>{

    const request = axios.post(`http://211.250.116.177:9090/`,{
    refreshToken : refToken,
    grantType : 'refresh_Token'
        },      
    )
    .then(response=>{
        return response.data
    })
    .catch(err => {console.log(err)
        return false
    })

    return{
        type : AUTO_SIGN_IN,
        payload : request,
    }
} 




export function signIn(data){
    return{
        type:SIGN_IN,
        payload : {
            token:data.accessToken,
            refreshToken:data.refreshToken,
            email:data.email,
            nickname:data.nickname,
            aboutme:data.aboutMe,
            nametag:data.nametag,
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