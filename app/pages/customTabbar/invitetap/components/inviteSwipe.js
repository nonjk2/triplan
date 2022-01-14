import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Image, Dimensions,Animated} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';


export const HiddenItemWithAction = props => {

    const {onClose} = props;

    return (
      <Animated.View style = {{alignItems: 'flex-end' , marginRight : 16,justifyContent:'center',marginTop:10,
         transform : [
            {
                scale: props.swipeAnimatedValue.interpolate(
                    {
                        inputRange: [-80, -60,-40, -30,-20,-10,0],
                        outputRange: [1,0.8,0.6,0.4,0.2,0.1,0],
                        extrapolate: 'clamp',
                    }
                ),
            },
         ] }}>
        <TouchableOpacity 
            // onPress={onClose}
            onPress={() => console.log(props)}
            style ={{backgroundColor : '#FF275B',width : 100 , height :100,borderRadius : 10, alignItems :'center', justifyContent :'center'}}>
            <IonIcon name="remove-outline" size={35} color = {'white'}/>

        </TouchableOpacity>
        
      </Animated.View>
    )
  }