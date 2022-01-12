import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapViewScreen from '../map/map';

class Maptap extends Component {

  render() {

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MapViewScreen/>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Maptap;
