import React, {Component, useEffect, useRef} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Plantap from './plantap';
import CheckTap from './checktap';
import Invitetap from './invitetap';
import Maptap from './maptap';
import AddplanSetting from '../addplandetail';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ScheduleSetting from '../schedulesetting';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Scheduledata } from '../../../util/forms/data';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from '../customDrawer';

const DATA = Scheduledata
const animate1 = {0 : {scale : .5, translateY : 0}, 1: {scale : 1.2, translateY : -8}}
const animate2 = {0 : {scale : 1.2, translateY : -8}, 1: {scale : 1, translateY : 0}}
const plusanimate1 = {0 : {scale : .5, translateY : 0}, 1: {scale : 1.7, translateY : -10}}
const plusanimate2 = {0 : {scale : .5, translateY : -10}, 1: {scale : 1.7, translateY : 0}}
const circle = {0 : {scale : 1}, 0.3: {scale : .5}, 0.5: {scale : .7}, 0.8: {scale : .9}, 1: {scale : 1}}
const circle2 = {0 : {scale : 1} ,1: {scale : 1}}
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
  const Tap = createBottomTabNavigator();


const Plantabs = ({route},props) => {
  const {planday,startDate , name,navigation } = route.params
  return (
    <Stack.Navigator screenOptions = {{headerShown : true }}>
        <Stack.Screen name={name} component={Plantap} options = {{headerShadowVisible : false , headerShown : false }} initialParams = {{planday : planday, startDate : startDate}}/> 
    </Stack.Navigator>

  )
}
const OptionmyDrawer = ({route}) => {
  const {planday,startDate,endDate , name,navigation,source} = route.params

  return (
      <Drawer.Navigator
        drawerContent = {props => <Sidebar
          source = {source}
          endDate = {endDate}
          startDate = {startDate}
          name = {name}
          DATA ={DATA}
          planday = {planday} 
          {...props}/>
        }
      >
        <Drawer.Screen 
        name = '스케쥴'
        component={Maptap}
        options = {{
          headerShown : false,
          drawerType : 'front',
          drawerPosition : "left",
          drawerStyle : {
            width : 267,
          }
        }}
        initialParams = {{planday : planday, startDate : startDate, name : name , DATA:DATA , source:source  }}/>
      </Drawer.Navigator>
  );
}


const Taparr = [
  {route : '스케쥴' , component : Plantap ,label : '플랜' ,activeIcon : 'calendar-outline', inactiveIcon : 'calendar', headerShadowVisible : false},
  {route : '지도' , component : OptionmyDrawer,label : '지도' ,activeIcon : 'map-outline', inactiveIcon : 'map',headershown : false,headerShadowVisible : false},
    {route : '초대된 친구목록' , component : Invitetap,label : '친구목록' ,activeIcon : 'person-add-outline', inactiveIcon : 'person-add',headershown : true,headerShadowVisible : false},
    {route : '체크리스트' , component : CheckTap,label : '체크리스트' ,activeIcon : 'checkbox-outline', inactiveIcon : 'checkbox',headershown : true,headerShadowVisible : false},
    {route : '프로필' , component : AddplanSetting,label : '프로필' ,activeIcon : 'person-circle-outline', inactiveIcon : 'person-circle',headershown : true,headerShadowVisible : false},
  
  ]
  
  
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
            {width: 50, height : 50, borderRadius: 25, backgroundColor: '#000', alignItems: 'center',justifyContent : 'center'}}
          ref = {viewRef}
          duration ={300}
        >
            {/* <Animatable.View 
                style={{...StyleSheet.absoluteFillObject, borderTopWidth :focused ? 0.5 : 0,borderColor :'#5585E8',borderRadius:25, alignItems :'center',justifyContent:'center'}}
                ref = {circleRef}
                duration ={300}
                >   */}
                <IonIcon name={focused ? item.inactiveIcon : item.activeIcon} size= {28} color = {focused ? '#5585E8' : '#fff'} style ={{}}/>
                <Text style ={{fontSize : 8 ,color : focused ? '#5585E8' : '#000', marginTop : focused ? 1.5 : 4,}} >{item.label}</Text>
            {/* </Animatable.View> */}
        </Animatable.View>
      </TouchableOpacity>
    )
  }
  
  
  export default function Tapmynavigation({route,navigation}){
    const {planday,startDate,name,source,endDate,plan_id} = route.params
    const viewRef = useRef(null)
    
    return (
      <Tap.Navigator
        
        screenOptions = {{

          tabBarStyle : {
            // position : 'absolute',
            height : 100,
            // bottom : 32,
            // right : 16,
            // left :16,
            // borderRadius : 15,
            backgroundColor : '#000',
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
                  initialParams = {{planday : planday, startDate : startDate, name : name , DATA:DATA,endDate: endDate  , source : source, plan_id : plan_id}}
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