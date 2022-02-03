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
import FirstOpen from './pages/firstopen';
import ScheduleSetting from './pages/schedulesetting';
import backbutton from '../src/icons/back.png';
import MapModal from './pages/addplan/components/mapmodal';
import SearchScreen from './pages/customTabbar/maptap/components/pinsearch';


// import MyMap from './pages/map';
const AuthStack = createNativeStackNavigator();
const isLoggin = true;




export const AppNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Loading" component={Loading} options={{headerShown : false }}/>
      <AuthStack.Screen name="Firstopen" component={FirstOpen} options={{headerShown : false }}/>
      <AuthStack.Screen name="TRIPIAN" component={HomeScreen} options={{headerShown : false }}/>
      <AuthStack.Screen name="plan" component={Tapmynavigation} options={({route}) => ({title : route.params.name , headerShown : false,headerShadowVisible: false ,headerBackTitleVisible : false, headerTintColor : 'black' })} />
      <AuthStack.Screen name="일정 편집" component={ScheduleSetting} options = {{headerShadowVisible : false,headerBackTitleVisible : false, headerTintColor : 'black'}}/>
      <AuthStack.Screen name="여행 추가" component={AddplanScreen} options = {{headerShadowVisible : false,headerBackTitleVisible : false, headerTintColor : 'black'}}/>
      <AuthStack.Screen name="프로필" component={SettingScreen} options = {{headerShadowVisible : false,headerBackTitleVisible : false, headerTintColor : 'black'}}/>
      <AuthStack.Screen name="지도추가" component={MapModal} options={{headerShown : false ,animation : 'fade'}}/>
      <AuthStack.Screen name="문의하기" component={ComplainScreen} options = {{headerShadowVisible : false,headerBackTitleVisible : false, headerTintColor : 'black'}}/>
      <AuthStack.Screen name="지도핀검색" component={SearchScreen} options={{headerShown : false }}/>
      {/* <AuthStack.Screen name="지도" component={MyMap} options = {{headerShown : false }}/> */}{}
    </AuthStack.Navigator>

  )
}