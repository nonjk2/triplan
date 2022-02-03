import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import Profile from './components/profile';
import Textsetting from './components/textinput';
import Helpcomponent from './components/help';
import { User } from '../../../util/forms/data';
import { useSelector,useDispatch } from 'react-redux';
import { ProfileSave } from '../../../util/misc';
import { getToken } from '../../../util/misc';

function SettingScreen(props) {
    
    const USERDATA=useSelector((state)=> state.user.auth)
    const [user,setuser]=useState(USERDATA || "")
    const [nickname,setnickname]=useState(user.nickname || "")
    const [email,setemail]=useState(user.email || "")
    const [aboutMe,setabuoutMe]=useState(user.aboutme || "")

    useEffect(() => {
        nickname ?
        props.navigation.setOptions({ 
            // 
          headerRight: () => (
            <TouchableOpacity
                onPress = {()=>{ProfileSave(nickname,aboutMe).then(()=>alert("완료"))}}
                disabled = {aboutMe != user.aboutme || nickname !=user.nickname ? aboutMe.length>0 && nickname.length >2? false : true :true}
            >
                <Text style={{color : aboutMe != user.aboutme || nickname !=user.nickname ? aboutMe.length>0 && nickname.length >2? '#5585E8' : '#C4C4C4' :'#C4C4C4'}}>
                    저장
                </Text>
            </TouchableOpacity>
          ),
        }) : ''
      }, [props.navigation,nickname,aboutMe]);


        return (
            nickname ?             
            <SafeAreaView style = {{ flex :1 ,backgroundColor : '#fff'}}>
                <View style={{ flex : 1, backgroundColor : '#fff'}}>
                    <Profile
                        user={user}
                        {...props}
                    />
                    <Textsetting

                        user={user}
                        setuser={setuser}
                        email={email}
                        setemail={setemail}
                        nickname={nickname}
                        setnickname={setnickname}
                        aboutMe={aboutMe}
                        setabuoutMe={setabuoutMe}
                        {...props}
                    />
                    <Helpcomponent
                        {...props}
                    />
                    <View style = {{ alignItems : 'center',flex :1, marginTop : 96,}}>
                        <TouchableOpacity onPress = {() => {props.navigation.navigate("문의하기")}}>
                            <Text style = {{fontSize : 15, fontWeight : '500' , color : 'red'}}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            : 
            <SafeAreaView style = {{backgroundColor : '#fff' , flex :1 ,alignItems : 'center', justifyContent :'center'}}>
                <Text>로그인이 필요합니다!</Text>
            </SafeAreaView>
            
        ) 
    }


const styles = StyleSheet.create({
    
});

export default SettingScreen;
