import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


export const setToken = async (value , callback) => {
    const firstPair = ["@triplan_app@email", value.email]
    const secondPair = ["@triplan_app@token", value.token]
    const thirdPair = ["@triplan_app@refToken", value.refreshToken]
    
    try {
      await AsyncStorage.multiSet([firstPair, secondPair,thirdPair],()=>callback())
    } catch(e) {
      //save error
    }
  
    console.log("Done.",thirdPair)
  }
  




  export const getToken = async (callback) => {

  let values
  try {
    values = await AsyncStorage.multiGet([
      '@triplan_app@email',
      '@triplan_app@token',
      '@triplan_app@refToken',
    ]).then(values=>{
      callback(values)
    })

  } catch(e) {
    // read error
  }
  console.log(values)
  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}





export const ProfileSave = async (nickname,aboutme) =>{
  const token = useSelector((state)=>state.user.auth.token)

  try {
    await axios.put(`http://211.250.116.177:9090/members`,{
      nickname : nickname,
      aboutme : aboutme
    },{
      headers : {
        Authorization : token
      }
    }      
  )
    .then((response)=>console.log(response))

    .catch(err =>Alert.alert("서버 회원가입 및 로그인 실패 : " + err));
} 
catch (error) {
        console.log(error)
    }
}



export const FirstSetting = async (nickname , aboutme) =>{
  const token = useSelector((state)=>state.user.auth.token)

  try {
    await axios.put(`http://211.250.116.177:9090/members`,{
      nickname : nickname,
      aboutme : aboutme
    },{
      headers : {
        "Authorization" : token
      }
    }      
  )
    .then((response)=>console.log(response))
    .catch(err =>Alert.alert("초기 세팅 실패 서버오류! : " + err));
} 
catch (error) {
        console.log(error)
    }
}


