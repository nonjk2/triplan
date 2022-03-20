import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {HeaderLogin} from './components/header';
import SettingCarousel from './components/Caroucel';
import SettingContents from './components/firstsetting';
import {useSelector, useDispatch} from 'react-redux';
function FirstOpen(props: any) {
  const user = useSelector((state: any) => state.user.auth);
  const dispatch = useDispatch();
  const [USERDATA] = useState(user);

  useEffect(() => {
    if (user.nickname && user.aboutme) {
      props.navigation.navigate('TRIPIAN');
    } else {
    }
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderLogin
        containerStyle={{
          height: 40,
          marginTop: 50,
          alignItems: 'center',
        }}
        rightComponent={undefined}
      />
      <SettingCarousel />
      <View style={{flex: 1}}>
        <SettingContents
          dispatch={dispatch}
          navigation={props.navigation}
          user={USERDATA}
        />
      </View>
    </View>
  );
}

export default FirstOpen;
