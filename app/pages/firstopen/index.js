
import React, {Component} from 'react';
import {StyleSheet, View,} from 'react-native';
import { HeaderLogin } from './components/header';
import SettingCarousel from './components/Caroucel';
import SettingContents from './components/firstsetting';
import { connect } from 'react-redux';
class FirstOpen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user : this.props.user.auth
    };
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
                user ={this.state.user}
            />
          </View>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state){
  return{
      user : state.user
  }
}

export default connect(mapStateToProps)(FirstOpen);