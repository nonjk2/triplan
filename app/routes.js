import React, {Component} from 'react';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import HomeScreen from './pages/plan/index'
import AddplanScreen from './pages/addplan';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './pages/auth';
import { View } from 'react-native';
import Sidebar from './pages/customDrawer';
import SettingScreen from './pages/setting';
import ComplainScreen from './pages/complain';
import Loading from './pages/auth/loading'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Plantap from './pages/plantap';
import CheckTap from './pages/checktap';
import Invitetap from './pages/invitetap';
import Maptap from './pages/maptap';
import PlanListItems from './pages/plan/components/PlanListItem';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import MyMap from './pages/map';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tap = createMaterialBottomTabNavigator();




const isLoggin = true;



const Tapmynavigation = () => {
  return (
    <Tap.Navigator
      initialRouteName = "plantap"
      barStyle = {{ paddingTop : 0, backgroundColor : '#000'}}
      shifting = {true}
      activeColor = '#5585E8'
      inactiveColor = '#fff'
      
      
      >
        <Tap.Screen 
          name={'plantap'} 
          component={Plantap}
          
          options ={{
            
            headerShown : false,
            tabBarLabel: '플랜',
            tabBarColor : '#000',
            tabBarIcon: ({ color }) => (
              <IonIcon name="calendar-outline" color ={color} size={22}/>
            ),}}
                    
        />
        <Tap.Screen name={'checktap'} component={CheckTap} options ={{
            headerShown : false,
            // tabBarBadge : true,
            
            tabBarLabel: '체크리스트',
            tabBarAccessibilityLabel : '체크리스트',

            tabBarColor : '#000',
            tabBarIcon: ({ color }) => (
              <IonIcon name="checkbox-outline" color ={color} size={22} style = {{}}/>
            ),}}/>
        <Tap.Screen name={'invitetap'} component={Invitetap} options ={{
            headerShown : false,
            tabBarLabel: '친구초대',
            tabBarColor : '#000',
            tabBarIcon: ({ color }) => (
              <IonIcon name="person-add-outline" color ={color} size={22}/>
            ),}}/>
        <Tap.Screen name={'maptap'} component={Maptap} options ={{
            headerShown : false,
            tabBarLabel: '지도',
            tabBarColor : '#000',
            tabBarIcon: ({ color }) => (
              <IonIcon name="map-outline" color ={color} size={22}/>
            ),}}/>

    </Tap.Navigator>

  )
}



const OptionmyDrawer = () => {
    return (
        <Drawer.Navigator
          drawerContent = {props => <Sidebar {...props}/>}
        >
          <Drawer.Screen 
          name = 'TRIPIANzzz'
          component={HomeScreen}
          options = {{
            headerShown : false,
            drawerType : 'front',
            drawerPosition : "right",
            drawerStyle : {
              width : 301,
            }
            
          }}/>
        </Drawer.Navigator>
    );
}

export const AppNavigation = () => {
  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Loading" component={Loading} options={{headerShown : false }}/>
        <AuthStack.Screen name="TRIPIAN" component={HomeScreen} options={{headerShown : false }}/>
        {/* <AuthStack.Screen name="SignIn" component={SignIn}/> */}
        <AuthStack.Screen name="plan" component={Tapmynavigation} options={{headerShown : false }}/>
        <AuthStack.Screen name="여행 추가" component={AddplanScreen} options = {{headerShadowVisible : false}}/>
        <AuthStack.Screen name="프로필" component={SettingScreen} options = {{headerShadowVisible : false}}/>
        <AuthStack.Screen name="문의하기" component={ComplainScreen} options = {{headerShadowVisible : false}}/>
        {/* <AuthStack.Screen name="지도" component={MyMap} options = {{headerShown : false }}/> */}
    </AuthStack.Navigator>

  )
}