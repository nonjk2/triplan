import React, {Component} from 'react';
import {Dimensions,StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity} from 'react-native';
import {DrawerActions , useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';




function LogoTitle() {
    return (
      <Image source={require('../../../../src/assets/TRIPLAN.jpg')}
      />
    );
  }

export const HeaderLogin = ({containerStyle, rightComponent}) => {
    return(
        <View
            style ={{
                flexDirection :'row',
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

        </View>
    )
}