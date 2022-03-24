/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import axios, {AxiosError} from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {
  Animated,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
  StyleSheet,
} from 'react-native';
import {login, logout} from '@react-native-seoul/kakao-login';
import {connect, useDispatch, useSelector} from 'react-redux';
import {signIn, signUp, autoSignIn} from '../../store/actions/user_action';
import {bindActionCreators} from 'redux';
import {setToken, getToken} from '../../../util/misc';
import * as Animatable from 'react-native-animatable';
import Input from '../../../util/forms/input';
import {ServerURL} from '../../../util/misc';
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

function Loading(props) {
  const dispatch = useDispatch();
  const xVaule = new Animated.Value(60);
  const opacity = new Animated.Value(0);
  const [data] = useState([]);
  const [isKakaoLogging] = useState(false);
  const [toggleon, settogglon] = useState(false);
  const [Signin, setSignin] = useState(true);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const user = useSelector(state => state.user);
  //////// auth 설정 /////////
  /////////////자동로그인/////////////////////////
  useEffect(() => {
    const getTokenRefresh = async () => {
      try {
        const token = await getToken((value: any) => value[2][1]);
        if (!token) {
          return;
        } else if (token) {
          dispatch(autoSignIn(token)).then(() => {
            if (!user.auth.accessToken) {
              Alert.alert('다시로그인을해주세요!');
              setSignin(false);
            } else {
              console.log('3단계성공');
              setToken(user.auth, () => {
                props.navigation.navigate('Firstopen');
              });
            }
          });
        }
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      }
    };
    getTokenRefresh();
    // getToken(value => {
    //   if (value[1][1] === null) {
    //     console.log('1단계 실패');
    //     setSignin(false);
    //     // Alert.alert("다시로그인을해주세요!")
    //   } else {
    //     dispatch(autoSignIn(value[2][1])).then(() => {
    //       if (!user.auth.accessToken) {
    //         Alert.alert('다시로그인을해주세요!');
    //         setSignin(false);
    //       } else {
    //         console.log('3단계성공');
    //         setToken(user.auth, () => {
    //           props.navigation.navigate('Firstopen');
    //         });
    //       }
    //     });
    //   }
    //   // console.log("getToken:",value)

    // });
  }, []);
  ///////////////자동로그인/////////////////////////
  // const onComplete = () => {
  //   if (Signin === true) {
  //     this.props.navigation.navigate('Firstopen');
  //   } else {
  //     this.props.navigation.navigate('Firstopen');
  //     // 자동로그인 활성화시 주석제거
  //   }
  // };

  const manageAcceess = () => {
    if (!user.auth.email) {
      Alert.alert('실패');
    } else {
      // console.log("asdfasdfasdf")
      setToken(user.auth, () => {
        props.navigation.navigate('Firstopen');
      });
    }
  };
  // 카카오 로그인 ///
  const kakaoSignIn = () => {
    login()
      .then(result => {
        logined(result.accessToken).then(() => manageAcceess());
        // console.log(result);
      })
      .catch(err => {
        Alert.alert('카카오 로그인 실패' + err);
      });
  };
  /// 구글 로그인 ///
  /// 네이버 로그인 ///

  ///서버 토큰 전달 ///
  const logined = async (token: any) => {
    try {
      await axios
        .post(`${ServerURL}/social/login/kakao`, {
          accessToken: token,
        })
        .then(response => dispatch(signIn(response.data.data)))
        .catch(err => Alert.alert('서버 회원가입 및 로그인 실패 : ' + err))
        .finally(() => console.log('완료'));
    } catch (error) {
      console.log(error);
    }
  };

  // const kakaoLogout = () => {
  //   console.log('   kakaoLogout   ');
  //   logout((err, result) => {
  //     if (err) {
  //       console.log('ㅁㅁㅁㅁㅁㅁ', err.toString());
  //       return;
  //     }
  //     alert('result', result);
  //   });
  // }

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {});
  };

  const nope = () => {
    const dummydata = {
      token: 'data.accessToken',
      refreshToken: 'data.refreshToken',
      email: '',
      nickname: 'this.state.name',
      aboutme: false,
      nametag: '5555',
    };
    dispatch(signIn(dummydata));
    props.navigation.navigate('Firstopen');
  };

  var regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../../src/assets/loading.png')}
        style={{height: HEIGHT_MODAL, width: WIDTH}}
      />

      <View style={{position: 'absolute', top: 94, left: 20}}>
        <Animated.Image
          source={require('../../../src/assets/triplan.png')}
          style={{
            opacity: opacity,
            left: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [60, 0],
            }),
          }}
          onLoad={onLoad}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          left: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => kakaoSignIn()}>
            <Image
              source={require('../../../src/assets/kakao_login_medium_wide.png')}
              style={{}}
            />
          </TouchableOpacity>
        </View>
        <Animatable.View
          style={[styles.toggle, toggleon && styles.toggledOn]}
          transition={['backgroundColor', 'fontSize', 'width', 'height']}>
          {toggleon ? (
            <TouchableOpacity
              // onPress = {() => this.props.navigation.navigate("TRIPIAN")}
              onPress={() => nope()}
              style={{top: 10}}>
              <View
                style={{
                  width: WIDTH * 0.78,
                  height: 47,
                  backgroundColor:
                    name.length > 2 && regEmail.test(email)
                      ? '#5585E8'
                      : '#c4c4c4',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>
                  가입하기
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress = {() => this.props.navigation.navigate("TRIPIAN")}
              style={{width: '100%', height: '100%'}}
              onPress={() => {
                settogglon(true);
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  width: WIDTH * 0.78,
                  height: 47,
                  backgroundColor: '#5585E8',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>
                  비회원 로그인
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {toggleon ? (
            <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
              <View
                style={{
                  width: WIDTH * 0.7,
                  position: 'absolute',
                  top: 80,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: name.length > 2 ? '#5585E8' : '#C4C4C4',
                  borderRadius: 4,
                  height: 36,
                }}>
                <Input
                  myPlanName="이름"
                  value={name}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  style={[toggleon && styles.input]}
                  fontSize={14}
                  placeholder="이름"
                  placeholderTextColor="#767676"
                  marginLeft={10}
                  maxLength={10}
                  onChangeText={value => setname(value)}
                />
                <Text
                  style={{
                    alignItems: 'flex-end',
                    fontSize: 15,
                    justifyContent: 'center',
                    color: this.state.name.length > 2 ? '#5585E8' : 'gray',
                    paddingRight: 2,
                  }}>
                  {name.length}/10
                </Text>
              </View>
              <View
                style={{
                  width: WIDTH * 0.7,
                  position: 'absolute',
                  top: 140,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: regEmail.test(email) ? '#5585E8' : '#C4C4C4',
                  borderRadius: 4,
                }}>
                <Input
                  myPlanName="이메일"
                  value={email}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  style={[toggleon && styles.input]}
                  fontSize={14}
                  placeholder="이메일"
                  placeholderTextColor="#767676"
                  marginLeft={10}
                  maxLength={20}
                  onChangeText={value => setemail(value)}
                />
                <Text
                  style={{
                    alignItems: 'flex-end',
                    fontSize: 15,
                    justifyContent: 'center',
                    color: regEmail.test(email) ? '#5585E8' : 'gray',
                    paddingRight: 2,
                  }}>
                  {email.length}/30
                </Text>
              </View>
            </View>
          ) : null}
        </Animatable.View>
        {/* <View style = {{marginTop : 16}}>
                        <TouchableOpacity

                        onPress = {() =>this.onComplete()}
                        >
                            <Image style ={{}} source = {require('../../../src/assets/google_loginBtn.png')}/>
                        </TouchableOpacity>
                    </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggle: {
    marginTop: 16,
    borderColor: '#5585E8',
    height: 52,
  },
  toggledOn: {
    backgroundColor: '#fff',
    height: HEIGHT_MODAL * 0.6,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#5585E8',
    color: 'rgba(255, 33, 33, 1)',
    fontSize: 16,
    width: WIDTH * 0.85,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowColor: '#000',
    shadowOpacity: 0.5,
    alignItems: 'center',
    transform: [
      // {
      // rotate: '50deg',
      // },
      {scaleX: 1},
    ],
  },
  input: {
    width: '100%',
    fontSize: 12,
    padding: 5,
    borderWidth: 2,
  },
});

export default Loading;
