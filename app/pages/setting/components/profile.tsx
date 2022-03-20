/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Imagemodal from './imagemodal';

const WIDTH = Dimensions.get('window').width;
const defaultImg =
  'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/11/bfbf9985-9838-4e27-9076-d4bfecbc88cc.jpg';

function Profile(props: any) {
  const [isModalVisible, setisModalvisible] = useState(false);
  const [myimage, setmyimage] = useState(defaultImg);

  const show = () => {
    setisModalvisible(true);
  };
  const closeOutside = () => {
    setisModalvisible(false);
  };

  const cameraselect = (Image: any) => {
    setmyimage(Image);
    closeOutside();
  };
  const defaultimgset = () => {
    setmyimage(defaultImg);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          marginVertical: 13,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 16,
          }}>
          <Image
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
            source={{
              uri: myimage,
            }}
          />
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: '#5585E8',
                }}>
                {props.user.nickname}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  color: '#767676',
                  fontSize: 16,
                  fontWeight: '400',
                }}>
                {props.user.aboutme || ''}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 28,
                width: 120,
                flex: 1,
                borderColor: '#fff',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}
              onPress={() => show()}>
              <Text style={{fontSize: 14, fontWeight: '400'}}>이미지 변경</Text>
            </TouchableOpacity>
          </View>
          <Modal
            style={styles.modal}
            isVisible={isModalVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            onBackdropPress={closeOutside}
            useNativeDriver={false}
            backdropColor={'#fff'}
            backdropOpacity={0.4}
            animationInTiming={400}>
            <Imagemodal
              close={closeOutside}
              cameraselect={cameraselect}
              defaultimgset={defaultimgset}
            />
          </Modal>
        </View>
      </View>

      <View
        style={{
          flex: 2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0, // This is the important style you need to set
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    height: 126,
    width: WIDTH,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    marginTop: 48,
  },
});

export default Profile;
