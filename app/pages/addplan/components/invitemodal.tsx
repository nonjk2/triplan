import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import SearchInput from '../../../../util/forms/input';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Highlighter from 'react-native-highlight-words';
import {useDispatch} from 'react-redux';
import {inviteDelete, inviteInsert} from '../../../store/actions/invite_action';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;
function InviteModal(props: any) {
  const [search, setsearch] = useState('');
  const [data, setdata] = useState(props.data);
  const dispatch = useDispatch();
  //검색창 입니다 ///
  const searchFirends = (text: any) => {
    if (text) {
      const newData = data.filter((item: any) => {
        const itemData = item.nickname
          ? item.nickname.toUpperCase()
          : ''.toUpperCase();
        const TextData = text.toUpperCase();
        return itemData.indexOf(TextData) > -1;
      });
      if (newData[0]) {
        setdata(props.data);
        setdata(newData);
        setsearch(text);
        console.log(search);
      } else {
        setsearch(text);
        console.log(search);
      }
    } else {
      setdata(props.data);
      setsearch(text);
      console.log(search);
    }
  };
  const renderTitle = () => {
    return (
      <View style={styles.modalTitle}>
        <View style={styles.modalTitleinside}>
          <IonIcon name="search" size={20} style={styles.modalIconLeft} />
          <View style={{flex: 1}}>
            <SearchInput
              value={search}
              onChangeText={(text: any) => searchFirends(text)}
              placeholder="친구이름#아이디번호"
              backgroundColor="#000"
              placeholderTextColor="#fff"
              color="#fff"
              borderRadius={5}
              style={{}}
            />
          </View>
          <Text style={styles.modalIconRight}>
            +{data.filter((e: any) => e.isSelected === true).length}
          </Text>
        </View>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View style={{marginTop: 10}}>
        <FlatList
          data={data}
          renderItem={renderInviteModal}
          showsVerticalScrollIndicator={true}
          keyExtractor={item => `key-${item.freinds_id}`}
          style={{
            width: '100%',
            height: 510,
            paddingHorizontal: 8,
            backgroundColor: '#fff',
          }}
        />
        <View style={styles.wrapButton}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                data.filter((e: any) => e.isSelected === true).length === 0
                  ? '#767676'
                  : '#5585E8',
              width: WIDTH - 32,
              height: 50,
              borderRadius: 10,
              zIndex: 6,
            }}
            onPress={onClickInvite}>
            <Text style={styles.compleatText}>완료</Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#ffffffAA',
              backfaceVisibility: 'hidden',
              display: 'flex',
              position: 'absolute',
              width: WIDTH,
              height: 100,
              alignItems: 'flex-start',
              bottom: -60,
              zIndex: 5,
            }}
          />
        </View>
      </View>
    );
  };

  const checked = (item: any, _index: any) => {
    const newData = data.map((e: any) => {
      if (e.nickname === item.nickname) {
        return {
          ...e,
          isSelected: !e.isSelected,
        };
      }
      return {
        ...e,
        isSelected: e.isSelected,
      };
    });

    setdata(newData);
  };
  const renderInviteModal = ({item, index}: any) => {
    return (
      <View
        style={{
          backgroundColor: item.isSelected ? 'rgba(85, 133, 232, 0.1)' : '#fff',
          marginVertical: 1,
          width: '100%',
          borderRadius: 10,
          height: 90,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '95%',
            height: 75,
          }}>
          <View style={styles.invitebutton}>
            <Image
              source={{uri: item.source}}
              style={{
                width: 80,
                height: 80,
                borderRadius: 15,
                flexWrap: 'wrap',
                borderColor: '#5585E8',
              }}
            />
            <View style={styles.invitecontain}>
              <View>
                <Highlighter
                  autoEscape={true}
                  highlightStyle={{
                    fontSize: 15,
                    fontWeight: '400',
                    lineHeight: 20,
                    letterSpacing: 1,
                    color: '#5585E8',
                  }}
                  searchWords={[search]}
                  textToHighlight={item.nickname}
                />
                {/* <Text style={{fontSize : 15 , fontWeight :'400', lineHeight : 20, letterSpacing : 1 , }}>{item.nickname}#{item.id}</Text> */}
                <Text>{item.introduce}</Text>
              </View>
            </View>
          </View>
          <CheckBox
            style={styles.checkbox}
            value={item.isSelected}
            onValueChange={() => checked(item, index)}
            animationDuration={0.2}
            lineWidth={2}
            onCheckColor="#fff"
            onTintColor="#5585E8"
            onFillColor="#5585E8"
            offAnimationType="fill"
            onAnimationType="fill"
            tintColor="#5585E8"
          />
        </View>
      </View>
    );
  };

  const onClickInvite = () => {
    const {close} = props;
    const listSelected = data.filter((e: any) => e.isSelected === true);
    dispatch(inviteDelete());
    for (let key in listSelected) {
      dispatch(inviteInsert(listSelected[key]));
    }
    close(data);
  };
  return (
    <View
      style={{
        width: WIDTH,
        height: 568,
        borderRadius: 10,
      }}>
      <View style={styles.modalView}>
        <View style={{alignItems: 'center', height: 30}}>
          <IonIcon name="remove-sharp" size={30} style={{color: '#000'}} />
        </View>
        {renderTitle()}
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 378,
    left: 16,
  },
  compleatButton: {},
  compleatText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: 14,
  },
  modalView: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    // paddingHorizontal: 5,
    maxHeight: HEIGHT_MODAL,
  },
  modalTitle: {
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  modalTitleinside: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 3,
    borderRadius: 5,
  },
  modalIconLeft: {
    flexWrap: 'wrap',
    zIndex: 999,
    color: '#fff',
    paddingLeft: 12,
  },
  modalIconRight: {
    flexWrap: 'wrap',
    paddingRight: 7,
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  checkbox: {
    height: 24,
    width: 24,
  },
  searchIcon: {
    flex: 1,
  },
  inviteModal: {
    flex: 1,
    justifyContent: 'flex-end',
    width: WIDTH,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invitebutton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  invitelistimage: {},
  invitecontain: {
    flex: 2,
    marginLeft: 10,
    justifyContent: 'center',
  },
  ddaystyle: {
    backgroundColor: '#5585E8',
    borderRadius: 30,
    color: 'white',
  },
});

export default InviteModal;
