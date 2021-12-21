import React, {Component} from 'react';
import {Dimensions,StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity} from 'react-native';
import {DrawerActions , useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';



const HeaderRight = () => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity
          onPress={() => 
        //   navigation.dispatch(DrawerActions.openDrawer())
            navigation.navigate('프로필')
            }
          style = {{
            marginHorizontal : 20,
            marginv : 10,

          }}>
            <IonIcon name="settings-outline" size ={25} />
        </TouchableOpacity>
    )
  }


function LogoTitle() {
    return (
      <Image source={require('../../../../src/assets/TRIPLAN.jpg')}
      />
    );
  }

export const Header = ({containerStyle, rightComponent}) => {
    return(
        <View
            style ={{
                flexDirection :'row',
                marginBottom : 10,
                ...containerStyle,
                
                
            }}
        >
            <View
                style ={{
                    marginLeft : 20,
                    flex:1,
                    alignItems : 'flex-start',
                    justifyContent : 'center'
                }}
            >   
                <LogoTitle/>
            </View>
            <HeaderRight/>


        </View>
    )
}