import axios from 'axios';
import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import ScheduleTap from './components/scheduleTap';

function Plantap(props) {
  const [isLoading,setisLoading]=useState(true)
  const {params} = props.route
  const [location,setlocation] =useState([])
  const [value, setvalue] = useState('')

    
    return (
      <SafeAreaView 
        style={{
          flex: 1,
          backgroundColor : '#fff',
          
        
        }}>
        
        <ScheduleTap
          plan_id = {params.plan_id} 
          planday = {params.planday}
          navigation={props.navigation}
          startDate = {params.startDate} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('일정추가',
            {
              plan_id : params.plan_id,
          });
        }}
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: 118,
            right: 20,
          }}>
          <View>
            <Image source={require('../../../../src/assets/Button.jpg')} />
          </View>
        </TouchableOpacity>
        
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({});

export default Plantap;
