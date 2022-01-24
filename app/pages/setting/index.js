import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import Profile from './components/profile';
import Textsetting from './components/textinput';
import Helpcomponent from './components/help';
import { User } from '../../../util/forms/data';

const USERDATA=User
function SettingScreen(props) {
    
    const [user,setuser]=useState(USERDATA)
    const [nickname,setnickname]=useState(USERDATA.nickname)
    const [email,setemail]=useState(USERDATA.email)
    const [aboutMe,setabuoutMe]=useState(USERDATA.aboutMe)

    useEffect(() => {
        props.navigation.setOptions({ 
            // 
          headerRight: () => (
            <TouchableOpacity
                onPress = {()=>{}}
                disabled = {aboutMe != USERDATA.aboutMe || nickname !=USERDATA.nickname ? aboutMe.length>0 && nickname.length >2? false : true :true}
            >
                <Text style={{color : aboutMe != USERDATA.aboutMe || nickname !=USERDATA.nickname ? aboutMe.length>0 && nickname.length >2? '#5585E8' : '#C4C4C4' :'#C4C4C4'}}>
                    저장
                </Text>
            </TouchableOpacity>
          ),
        });
      }, [props.navigation,nickname,aboutMe]);


        return (
            <SafeAreaView style = {{ flex :1 ,backgroundColor : '#fff'}}>
                <View style={{ flex : 1, backgroundColor : '#fff'}}>
                    <Profile
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
        );
    }


const styles = StyleSheet.create({
    
});

export default SettingScreen;
