
import React, {Component, useState} from 'react';
import {StyleSheet, View,} from 'react-native';
import { HeaderLogin } from './components/header';
import SettingCarousel from './components/Caroucel';
import SettingContents from './components/firstsetting';
import { connect  } from 'react-redux';
import { useSelector,useDispatch } from 'react-redux';
function FirstOpen(props) {
  


const user = useSelector((state)=>state.user.auth)
const dispatch = useDispatch();
const [USERDATA,setuser]=useState(user)


    return (
      <View style ={{ flex :1 , backgroundColor : '#fff'}}>
          <HeaderLogin
            containerStyle={{
                height: 40,
                marginTop : 50,
                alignItems: 'center',
            }}
          />
          <SettingCarousel/>
          <View style ={{flex :1}}>
            <SettingContents
                dispatch = {dispatch}
                navigation = {props.navigation}
                user ={USERDATA}
            />
          </View>
    
      </View>
    );
  }


const styles = StyleSheet.create({});



export default FirstOpen;