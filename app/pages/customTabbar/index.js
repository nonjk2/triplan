import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Plantap from '../plantap'
import CheckTap from '../checktap';
import Invitetap from '../invitetap';
import Maptap from '../maptap';
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const animate1 = {0 : {scale : .5, translateY : 0}, 1: {scale : 1.2, translateY : -8}}
const animate2 = {0 : {scale : 1.2, translateY : -8}, 1: {scale : 1, translateY : 0}}
const circle = {0 : {scale : 1}, 0.3: {scale : .5}, 0.5: {scale : .7}, 0.8: {scale : .9}, 1: {scale : 1}}
const circle2 = {0 : {scale : 1} ,1: {scale : 1}}

const Taparr = [
    {route : 'plantap' , component : Plantap,label : '플랜' ,activeIcon : 'calendar-outline', inactiveIcon : 'calendar'},
    {route : 'checktap' , component : CheckTap,label : '체크리스트' ,activeIcon : 'checkbox-outline', inactiveIcon : 'checkbox'},
    {route : 'invitetap' , component : Invitetap,label : '초대하기' ,activeIcon : 'person-add-outline', inactiveIcon : 'person-add'},
    {route : 'maptap' , component : Maptap,label : '지도' ,activeIcon : 'map-outline', inactiveIcon : 'map'}
  
  ]
  const Tap = createBottomTabNavigator();
  
  const TapButton = (props) => {
  
    const {item,onPress,accessibilityState} = props;
    const focused = accessibilityState.selected
    const viewRef = useRef(null)
    const circleRef = useRef(null)
    useEffect(() =>{
      if (focused) { 
        viewRef.current.animate(animate1);
        // circleRef.current.animate(circle)
      }else{
        viewRef.current.animate(animate2);
        // circleRef.current.animate(circle2)
      }
    },[focused])
  
    return(
      <TouchableOpacity
        style = {{flex :1, justifyContent :'center' , top : 13 , alignItems :'center'}}
        onPress ={onPress}
        activeOpacity ={1}
      >
        <Animatable.View
          style = {{width: 50, height : 50, borderRadius: 25, backgroundColor: '#fff', alignItems: 'center',justifyContent : 'center'}}
          ref = {viewRef}
          duration ={300}
        >
            {/* <Animatable.View 
                style={{...StyleSheet.absoluteFillObject, borderTopWidth :focused ? 0.5 : 0,borderColor :'#5585E8',borderRadius:25, alignItems :'center',justifyContent:'center'}}
                ref = {circleRef}
                duration ={300}
                >   */}
                <IonIcon name={focused ? item.inactiveIcon : item.activeIcon} size= {25} color = {focused ? '#5585E8' : '#5585E8'}/>
                <Text style ={{fontSize : 8 ,color : focused ? '#5585E8' : '#000', marginTop : focused ? 1.5 : 4,}} >{item.label}</Text>
            {/* </Animatable.View> */}
        </Animatable.View>
      </TouchableOpacity>
    )
  }
  
  
  export default function Tapmynavigation(){
    const viewRef = useRef(null)
    return (
      <Tap.Navigator
        
        screenOptions = {{
          headerShown : false,
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
            elevation :5
          },
          
          
        }}
        >
          {Taparr.map((item,index) => {
            return(
              <Tap.Screen
                  key = {index}
                  name = {item.route}
                  component = {item.component}
                  options = {{
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