import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

class SignIn extends Component {

  render() {

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>SignIn Screen</Text>
        <Button
          title="To Home Screen"
          onPress={() => {
            this.props.navigation.navigate('TRIPIAN');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default SignIn;
