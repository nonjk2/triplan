import React, {Component, useEffect, useRef} from 'react';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import HomeScreen from './pages/plan/index'
import AddplanScreen from './pages/addplan';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './pages/auth';
import Sidebar from './pages/customDrawer';
import SettingScreen from './pages/setting';
import ComplainScreen from './pages/complain';
import Loading from './pages/auth/loading'
import Tapmynavigation from './pages/customTabbar';



// import MyMap from './pages/map';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const isLoggin = true;


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