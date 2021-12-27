import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView} from 'react-native';
import ScheduleTap from './components/scheduleTap';

class Plantap extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading : true ,
      location : [],
      value : '문래자이'
      
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
        startDate = {params.startDate} 
                      
                      />
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

export default Plantap;
