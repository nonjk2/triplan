import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Profile from './components/profile';
import Textsetting from './components/textinput';
import Helpcomponent from './components/help';
import {useSelector} from 'react-redux';
import {ServerURL} from '../../../util/misc';
import axios from 'axios';

function SettingScreen(props: any) {
  const USERDATA = useSelector((state: any) => state.user.auth);
  const [user, setuser] = useState(USERDATA || '');
  const [nickname, setnickname] = useState(user.nickname || '');
  const [email, setemail] = useState(user.email || '');
  const [aboutMe, setabuoutMe] = useState(user.aboutme || '');
  const accessToken = useSelector((state: any) => state.user.auth?.accessToken);

  useEffect(() => {
    nickname
      ? props.navigation.setOptions({
          //
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                ProfileUpdate();
              }}
              disabled={
                aboutMe !== user.aboutme || nickname !== user.nickname
                  ? aboutMe.length > 0 && nickname.length > 2
                    ? false
                    : true
                  : true
              }>
              <Text
                style={{
                  color:
                    aboutMe !== user.aboutme || nickname !== user.nickname
                      ? aboutMe.length > 0 && nickname.length > 2
                        ? '#5585E8'
                        : '#C4C4C4'
                      : '#C4C4C4',
                }}>
                저장
              </Text>
            </TouchableOpacity>
          ),
        })
      : '';
  }, [props.navigation, nickname, aboutMe]);

  const ProfileUpdate = async () => {
    await axios
      .put(
        `${ServerURL}/members`,
        {
          nickname: nickname,
          aboutMe: aboutMe,
        },
        {
          headers: {
            'X-AUTH-TOKEN': accessToken,
          },
        },
      )
      .then(function () {
        props.navigation.navigate('TRIPIAN');
      })
      .catch(function (_error) {
        // 오류발생시 실행aag
      })
      .then(function () {
        // 항상 실행
      });

    // async await 함수를 사용할 때,
  };

  return nickname ? (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Profile user={user} {...props} />
        <Textsetting
          user={user}
          setuser={setuser}
          email={email}
          setemail={setemail}
          nickname={nickname}
          setnickname={setnickname}
          aboutMe={aboutMe}
          setabuoutMe={setabuoutMe}
          {...props}
        />
        <Helpcomponent {...props} />
        <View style={{alignItems: 'center', flex: 1, marginTop: 96}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('문의하기');
            }}>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'red'}}>
              로그아웃
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>로그인이 필요합니다!</Text>
    </SafeAreaView>
  );
}

export default SettingScreen;
function alert(_arg0: string) {
  throw new Error('Function not implemented.');
}
