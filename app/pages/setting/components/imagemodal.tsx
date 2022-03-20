import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

function Imagemodal(props: any) {
  const takePhotos = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      props.cameraselect(image.path);
    });
    props.close();
  };

  const choosePhotoFromGelrary = () => {
    ImagePicker.openPicker({
      width: 80,
      cropperChooseText: '선택',
      cropperCancelText: '취소',
      cropperCircleOverlay: true,
      cropperToolbarTitle: '프로필사진을 골라주세요',
      height: 80,
      cropping: true,
    }).then(image => {
      props.cameraselect(image.path);
      console.log(image);
    });
  };

  const defaultimgsetting = () => {
    props.defaultimgset();
    props.close();
  };

  return (
    <View
      style={{
        width: 343,
        height: 218,
        borderRadius: 10,
        bottom: '10%',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.28,
        shadowColor: '#000',
      }}>
      {/* <View style = {{width : 343 , height : 40 ,backgroundColor : '#5585E8'  , borderTopRightRadius: 10,borderTopLeftRadius : 10, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = {{ color : '#fff' , fontSize : 15, fontWeight : '500'}}>이미지 가져오기</Text>
                        </View> */}
      <View
        style={{
          width: 343,
          height: 158,
          borderRadius: 10,
          backgroundColor: '#fff',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.1,
          shadowColor: '#000',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomColor: '#C4C4C4',
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={defaultimgsetting}>
            {/* <IonIcon name="sync-outline" size={20} style ={{ paddingRight : 8}}/> */}
            <Text>현재 사진 삭제</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderBottomColor: '#C4C4C4',
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={takePhotos}>
            {/* <IonIcon name="camera-outline" size={20} style ={{ paddingRight : 8}}/> */}
            <Text>사진 촬영</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomColor: '#C4C4C4',
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={choosePhotoFromGelrary}>
            {/* <IonIcon name="image-outline" size={20} style ={{ paddingRight : 8}}/> */}
            <Text>앨범에서 가져오기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.close();
        }}
        style={{
          position: 'absolute',
          bottom: 1,
          width: 343,
          height: 52,
          borderRadius: 10,
          backgroundColor: '#fff',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.28,
          shadowColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'red'}}>취소</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Imagemodal;
