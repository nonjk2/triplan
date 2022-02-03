import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import ScheduleTap from './components/scheduleTap';

class Plantap extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading : true ,
      location : [],
      value : ''
      
    }
  }

  render() {
    const {params} = this.props.route
    return (
      <SafeAreaView 
        style={{
          flex: 1,
          backgroundColor : '#fff',
          
        
        }}>
        
        <ScheduleTap 
          planday = {params.planday}
          navigation={this.props.navigation}
          startDate = {params.startDate} />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('일정 추가');
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
}

const styles = StyleSheet.create({});

export default Plantap;
