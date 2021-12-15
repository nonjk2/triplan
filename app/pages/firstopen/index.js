
import React, {Component} from 'react';
import {StyleSheet, View,} from 'react-native';
import { HeaderLogin } from './components/header';
import SettingCarousel from './components/Caroucel';
import SettingContents from './components/firstsetting';
class FirstOpen extends Component {

  state = {
  }

  render() {

    return (
      <View style ={{ flex :1 , backgroundColor : '#fff'}}>
          <HeaderLogin
            containerStyle={{
                height: 40,
                marginTop : 50,
                alignItems: 'center',
            }}
          />
          <SettingCarousel/>
          <View style ={{flex :1}}>
            <SettingContents
                navigation = {this.props.navigation}
            />
          </View>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default FirstOpen;
