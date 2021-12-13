import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView ,TouchableOpacity, Image} from 'react-native';
import {NavigationContainer, DrawerActions , useNavigation} from '@react-navigation/native';
import {
  createDrawerNavigator, DrawerContentScrollView
} from '@react-navigation/drawer';
import HomeScreen from '../../app/pages/plan';



const Drawer = createDrawerNavigator();

const OptionmyDrawer = () => {
    return (
        <Drawer.Navigator>
          <Drawer.Screen 
          name = 'TRIPIANzzz'
          component={HomeScreen}
          options = {{
            headerShown : false,
            drawerType : 'front',
            drawerPosition : "right",
            drawerStyle : {
              width : 200,
            }
          }}/>
        </Drawer.Navigator>
    );
}





const styles = StyleSheet.create({});

export default OptionmyDrawer;
