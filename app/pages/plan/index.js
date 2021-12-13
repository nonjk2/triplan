import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PlanTabView from './components/PlanTab';
import Carousel from './components/Carousel';
import {dummydata} from './components/CaroucelData';
import { Header } from './components/header';






class HomeScreen extends Component {
  render() {

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header
          containerStyle={{
            height: 40,
            marginTop : 50,
            alignItems: 'center',
          }}
        />
        <View style={{flexWrap: 'wrap', marginTop: 10}}>
          <Carousel data={dummydata} />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
            backgroundColor: '#fff',
          }}>
          <PlanTabView key={this.props.key} navigation = {this.props.navigation} />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('여행 추가');
          }}
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: 50,
            right: 20,
          }}>
          <View>
            <Image source={require('../../../src/assets/Button.jpg')} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default HomeScreen;
