import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from '../../../../util/forms/input';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import CheckModal from '../../../../util/forms/checkProccess';
import {signIn} from '../../../store/actions/user_action';
import axios from 'axios';
import {ServerURL} from '../../../../util/misc';
function SettingContents(props: any) {
  const {dispatch, navigation} = props;
  const [nickname, setnickname] = useState(props.user.nickname);
  const [introduce, setintroduce] = useState(props.user.aboutme);
  const [isAccessAleatOpen, setisAccessAleatOpen] = useState(false);
  const {accessToken} = useSelector((state: any) => state.user.auth);

  const introduceUpdate = () => {
    axios
      .put(
        `${ServerURL}/members`,
        {nickname: nickname, aboutMe: introduce, email: props.user.email},
        {headers: {'X-AUTH-TOKEN': accessToken}},
      )
      .then(function () {
        compleate();
      })
      .catch(function () {
        // 오류발생시 실행
      })
      .then(function () {
        // 항상 실행
      });
    // async await 함수를 사용할 때,
  };

  const close = () => {
    setisAccessAleatOpen(false);
  };
  const compleate = () => {
    dispatch(signIn({...props.user, aboutMe: introduce, nickname: nickname}));
    setisAccessAleatOpen(true);
    setTimeout(setisAccessAleatOpen, 1500, false);
    navigation.navigate('TRIPIAN');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginHorizontal: 32, marginTop: 10}}>
        <View>
          <Text style={{marginBottom: 24, fontSize: 22, fontWeight: '400'}}>
            간단 설정을 마무리해주세요 :)
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor:
              nickname !== false && nickname.length > 2 ? '#5585E8' : '#C4C4C4',
            borderRadius: 10,
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <Input
            value={nickname ? nickname : ''}
            autoCapitalize={'none'}
            fontSize={14}
            placeholder="닉네임을 입력해주세요"
            placeholderTextColor="#767676"
            marginLeft={10}
            maxLength={10}
            color={'#767676'}
            onChangeText={(value: any) => setnickname(value)}
          />
          {/* {this.iconCheck("nickname")} */}
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor:
              introduce !== false && introduce.length > 2
                ? '#5585E8'
                : '#C4C4C4',
            borderRadius: 10,
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Input
            value={introduce ? introduce : ''}
            autoCapitalize={'none'}
            fontSize={14}
            placeholder="자기소개를 입력해주세요"
            placeholderTextColor="#767676"
            marginLeft={10}
            maxLength={10}
            onChangeText={(value: any) => setintroduce(value)}
          />
          {/* {this.iconCheck("introduce")} */}
          {/* <IonIcon name="reader-outline" size={18} style={{  marginRight : 10,color: this.state.introduce.length < 10 ? 'gray' :'#5585E8' ,fontWeight : '400'}}/> */}
        </View>
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity
          // onPress = {()=> compleate()}
          onPress={() => introduceUpdate()}>
          <View
            style={{
              width: 343,
              height: 52,
              backgroundColor: introduce.length > 1 ? '#5585E8' : '#c4c4c4',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text style={{fontSize: 14, fontWeight: '400', color: 'white'}}>
              완료
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress = {()=> compleate()}
          onPress={() => navigation.navigate('일정추가')}>
          <View
            style={{
              width: 343,
              height: 52,
              backgroundColor: introduce.length > 1 ? '#5585E8' : '#c4c4c4',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text style={{fontSize: 14, fontWeight: '400', color: 'white'}}>
              건너뛰기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        style={styles.modal}
        isVisible={isAccessAleatOpen}
        backdropColor={'#000000CC'}
        backdropOpacity={0.5}
        animationIn={'fadeIn'}
        animationOut={'bounceOut'}>
        <CheckModal close={close} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingContents;
