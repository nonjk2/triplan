import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import InviteListItems from './invitelistitem';
import InviteModal from './invitemodal';
import IonIcon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;

function InviteList(props: any) {
  const [data, setdata] = useState(props.data);
  const [isModalVisible, setisModalVisible] = useState(false);

  useEffect(() => {
    getModaldataItem();
  }, []);

  const getModaldataItem = () => {
    const newArray = data.map((e: any) => {
      return {
        ...e,
        isSelected: false,
      };
    });
    setdata(newArray);
  };

  const renderInvite = ({item}: any) => {
    return (
      <InviteListItems
        source={item.source}
        nickname={item.nickname}
        id={item.freinds_id}
      />
    );
  };

  const show = () => {
    setisModalVisible(true);
  };

  const close = (dataSelctture: any) => {
    setisModalVisible(false);
    setdata(dataSelctture);
  };
  const closeOutside = () => {
    setisModalVisible(false);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textname}>초대된 친구목록</Text>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#000',
              width: 36,
              height: 22,
              borderRadius: 6,
              marginLeft: 5,
              paddingBottom: 5,
              bottom: 2,
            }}>
            <Text
              style={{
                color: 'white',
                top: 3.5,
                fontSize: 12,
                fontWeight: '400',
              }}>
              {props.invite.length}/8
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={show}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.invitefriendlist}>초대</Text>
            <IonIcon name="add-outline" size={20} color="#5585E8" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        data={props.invite}
        renderItem={renderInvite}
        numColumns={4}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#fff',
        }}
      />
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackdropPress={closeOutside}
        useNativeDriver={false}
        // backdropColor='#000000AA'
        backdropOpacity={0.4}
        animationInTiming={400}>
        <InviteModal
          isModalVisible={isModalVisible}
          title="asssdsdds"
          close={close}
          onTouchOutside={closeOutside}
          data={data}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0, // This is the important style you need to set
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: WIDTH,
    height: 568,
  },
  invitefriendlist: {
    fontSize: 16,
    color: '#5585E8',
    fontWeight: '400',
  },
  textname: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
});

export default InviteList;
