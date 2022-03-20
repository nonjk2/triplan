import React from 'react';
import {View, Image} from 'react-native';

function LogoTitle() {
  return <Image source={require('../../../../src/assets/TRIPLAN.jpg')} />;
}

export const HeaderLogin = ({containerStyle}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        ...containerStyle,
      }}>
      <View
        style={{
          marginLeft: 20,
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <LogoTitle />
      </View>
    </View>
  );
};
