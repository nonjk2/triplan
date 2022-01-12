import React, {Component, useEffect, useRef} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Plantap from '../plantap'
import CheckTap from '../checktap';
import Invitetap from '../invitetap';
import Maptap from '../maptap';
import AddplanSetting from '../addplandetail';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ScheduleSetting from '../schedulesetting';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const animate1 = {0 : {scale : .5, translateY : 0}, 1: {scale : 1.2, translateY : -8}}
const animate2 = {0 : {scale : 1.2, translateY : -8}, 1: {scale : 1, translateY : 0}}
const plusanimate1 = {0 : {scale : .5, translateY : 0}, 1: {scale : 1.7, translateY : -10}}
const plusanimate2 = {0 : {scale : .5, translateY : -10}, 1: {scale : 1.7, translateY : 0}}
const circle = {0 : {scale : 1}, 0.3: {scale : .5}, 0.5: {scale : .7}, 0.8: {scale : .9}, 1: {scale : 1}}
const circle2 = {0 : {scale : 1} ,1: {scale : 1}}


const Plantabs = ({route},props) => {
  const {planday,startDate , name,navigation} = route.params
  return (
    <Stack.Navigator screenOptions = {{headerShown : true }}>
        <Stack.Screen name={name} component={Plantap} options = {{headerShadowVisible : false , headerShown : false }} initialParams = {{planday : planday, startDate : startDate}}/> 
    </Stack.Navigator>

  )
}



const Taparr = [
  {route : '스케쥴' , component : Plantap ,label : '플랜' ,activeIcon : 'calendar-outline', inactiveIcon : 'calendar', headerShadowVisible : false},
  {route : '지도' , component : Maptap,label : '지도' ,activeIcon : 'map-outline', inactiveIcon : 'map',headershown : false},
    {route : '초대된 친구목록' , component : Invitetap,label : '친구목록' ,activeIcon : 'person-add-outline', inactiveIcon : 'person-add',headershown : true},
    {route : '체크리스트' , component : CheckTap,label : '체크리스트' ,activeIcon : 'checkbox-outline', inactiveIcon : 'checkbox',headershown : true},
    {route : '프로필' , component : AddplanSetting,label : '프로필' ,activeIcon : 'person-circle-outline', inactiveIcon : 'person-circle',headershown : true},
  
  ]
  const Stack = createNativeStackNavigator();
  const Tap = createBottomTabNavigator();
  
  const TapButton = (props) => {
    
    const {item,onPress,accessibilityState} = props;
    const focused = accessibilityState.selected
    const viewRef = useRef(null)
    const circleRef = useRef(null)
    useEffect(() =>{
      if (focused) {         viewRef.current.animate(animate1);
        // circleRef.current.animate(circle)
      }else{
        viewRef.current.animate(plusanimate2);
        viewRef.current.animate(animate2);
        // circleRef.current.animate(circle2)
        }
    },[focused])

  
  
    return(
      <TouchableOpacity
        style = {
          
          {flex :1, justifyContent :'center' , top : 13 , alignItems :'center'}}
        onPress ={onPress}
        activeOpacity ={1}
      >
        <Animatable.View
          style = {
            {width: 50, height : 50, borderRadius: 25, backgroundColor: '#fff', alignItems: 'center',justifyContent : 'center'}}
          ref = {viewRef}
          duration ={300}
        >
            {/* <Animatable.View 
                style={{...StyleSheet.absoluteFillObject, borderTopWidth :focused ? 0.5 : 0,borderColor :'#5585E8',borderRadius:25, alignItems :'center',justifyContent:'center'}}
                ref = {circleRef}
                duration ={300}
                >   */}
                <IonIcon name={focused ? item.inactiveIcon : item.activeIcon} size= {25} color = {focused ? '#5585E8' : '#5585E8'} style ={{}}/>
                <Text style ={{fontSize : 8 ,color : focused ? '#5585E8' : '#000', marginTop : focused ? 1.5 : 4,}} >{item.label}</Text>
            {/* </Animatable.View> */}
        </Animatable.View>
      </TouchableOpacity>
    )
  }
  
  
  export default function Tapmynavigation({route,navigation}){
    const {planday,startDate,name} = route.params
    const viewRef = useRef(null)
    return (
      <Tap.Navigator
        
        screenOptions = {{

          tabBarStyle : {
            position : 'absolute',
            height : 70,
            bottom : 32,
            right : 16,
            left :16,
            borderRadius : 15,
            shadowOffset : {
              width : 0,
              height : 10,
            },
            shadowColor : '#000',
            shadowOpacity : 0.25,
            elevation :5,
            justifyContent : 'center',
            alignItems: 'center'
            
          },
          
          
        }}
        >
          {Taparr.map((item,index) => {
            return(
              <Tap.Screen
                  key = {index}
                  name = {item.route}
                  component = {item.component}
                  initialParams = {{planday : planday, startDate : startDate, name : name }}
                  options = {{
                    headerTintColor : 'black',
                    
                    headerLeft : (prors) => <Button title = {'메인'} onPress = {()=>{navigation.navigate("TRIPIAN")}}/>,
                    headerShown : item.headershown,
                    // title : name +' - '+item.route,
                    title : item.route,
                    headerShadowVisible :item.headerShadowVisible,
                    tabBarShowLabel : false,
                    // tabBarLabel : item.label,
                    tabBarButton : (props) => <TapButton {...props} item = {item}/>
                  }}
              />
            )
          })}

      </Tap.Navigator>
  
    )
  }