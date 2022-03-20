import React from 'react';
import {View, Text, Button} from 'react-native';

function SignIn(props: any) {
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
          props.navigation.navigate('TRIPIAN');
        }}
      />
    </View>
  );
}

export default SignIn;
