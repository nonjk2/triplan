import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity,Image} from 'react-native';
import {NavigationContainer ,} from '@react-navigation/native';
import { AppNavigation } from './routes'


class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigation/>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({});

export default App;
 