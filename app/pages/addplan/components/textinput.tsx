import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Calendars from './datepicker';
import {useSelector, useDispatch} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Input from '../../../../util/forms/input';
import axios from 'axios';
import {ServerURL} from '../../../../util/misc';
import {planToggleAction} from '../../../store/actions/plan_action';

const WIDTH = Dimensions.get('window').width;
/////////////////// 날짜 포맷 ///////////////////////
// Date.prototype.format = function (f: any): any {
//   if (!this.valueOf()) {
//     return ' ';
//   }

//   var weekName = [
//     '일요일',
//     '월요일',
//     '화요일',
//     '수요일',
//     '목요일',
//     '금요일',
//     '토요일',
//   ];
//   var d = this;

//   return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1: any) {
//     switch ($1) {
//       case 'yyyy':
//         return d.getFullYear();
//       case 'yy':
//         return (d.getFullYear() % 1000).zf(2);
//       case 'MM':
//         return (d.getMonth() + 1).zf(2);
//       case 'dd':
//         return d.getDate().zf(2);
//       case 'E':
//         return weekName[d.getDay()];
//       case 'HH':
//         return d.getHours().zf(2);
//       case 'hh':
//         return ((h = d.getHours() % 12) ? h : 12).zf(2);
//       case 'mm':
//         return d.getMinutes().zf(2);
//       case 'ss':
//         return d.getSeconds().zf(2);
//       case 'a/p':
//         return d.getHours() < 12 ? '오전' : '오후';
//       default:
//         return $1;
//     }
//   });
// };

// String.prototype.string = function (len: any) {
//   var s = '',
//     i = 0;
//   while (i++ < len) {
//     s += this;
//   }
//   return s;
// };
// String.prototype.zf = function (len: any) {
//   return '0'.string(len - this.length) + this;
// };
// Number.prototype.zf = function (len: any) {
//   return this.toString().zf(len);
// };

/////////////////// 날짜 포맷 ///////////////////////

function Textplanform(props: any) {
  const {navigation} = props;

  const [search, setsearch] = useState(false) as any[];
  const [endsearch, setendsearch] = useState(false) as any[];
  const [isModalVisible, setisModalVisible] = useState(false);
  // const [isModalmapVisible,setisModalmapVisible]=useState(false)
  const [firstday, setfirstday] = useState('');
  const [lastday, setlastday] = useState('');
  const [planname, setplanname] = useState('');
  const [planday, setplanday] = useState({
    value: [],
    date: '',
  });
  const [planlocation] = useState('');
  const accessToken = useSelector((state: any) => state.user.auth?.accessToken);
  const dispatch = useDispatch();

  const Addplan = () => {
    dispatch(planToggleAction(true));
    axios
      .post(
        `${ServerURL}/plans`,
        {
          planTitle: planname,
          startDate: new Date(firstday),
          endDate: new Date(lastday),
          map: [
            {
              addressDetail: search.name,
              address: search.vicinity,
              planImage: search.photos ? search.photos[0].photo_reference : '',
              locationX: search.geometry.location.lat,
              locationY: search.geometry.location.lng,
            },
            {
              addressDetail: endsearch.name,
              address: endsearch.vicinity,
              planImage: endsearch.photos
                ? endsearch.photos[0].photo_reference
                : '',
              locationX: endsearch.geometry.location.lat,
              locationY: endsearch.geometry.location.lng,
            },
          ],
        },
        {
          headers: {
            'X-AUTH-TOKEN': accessToken,
          },
        },
      )
      .then(function () {
        alert('보내기완료');
      })
      .catch(function (error) {
        alert('보내기실패');
        console.log(error);
      });
    navigation.navigate('TRIPIAN');
    // async await 함수를 사용할 때,
  };

  useEffect(() => {
    if (props.route.params?.search) {
      setsearch(props.route.params?.search);
    }
    if (props.route.params?.endsearch) {
      setendsearch(props.route.params?.endsearch);
    }
  }, [props.route.params?.search, props.route.params?.endsearch]);

  useLayoutEffect(() => {
    props.navigation.setOptions(
      {
        headerRight: () => (
          <TouchableOpacity
            onPress={() => Addplan()}
            disabled={
              planname.length > 3 && firstday.length !== 0 && search
                ? false
                : true
            }>
            <Text
              style={{
                color:
                  planname.length > 3 && firstday.length !== 0 && search
                    ? '#5585E8'
                    : '#000',
              }}>
              저장
            </Text>
          </TouchableOpacity>
        ),
      },
      [
        props.navigation,
        firstday,
        planlocation,
        planname,
        search,
        props.route.params?.search,
      ],
    );
  });
  const close = () => {
    setisModalVisible(false);
  };
  const closeOutside = (selectday: any) => {
    setfirstday(selectday[0]);
    setlastday(selectday[1]);
    setisModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.containertwo}>
        <Text style={styles.textname}>여행명</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: planname.length > 3 ? '#5585E8' : '#C4C4C4',
            borderRadius: 4,
            height: 36,
          }}>
          <Input
            myPlanName="여행명"
            value={planname}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            style={styles.input}
            fontSize={14}
            placeholder="여행명을 입력해주세요"
            placeholderTextColor="#767676"
            marginLeft={10}
            maxLength={10}
            onChangeText={(value: any) => setplanname(value)}
          />
          <Text
            style={{
              alignItems: 'flex-end',
              fontSize: 15,
              justifyContent: 'center',
              color: planname.length === 0 ? 'gray' : '#5585E8',
              paddingRight: 2,
            }}>
            {planname.length}/10
          </Text>
        </View>
      </View>

      <View style={styles.containertwo}>
        <Text style={styles.textname}>여행기간/날짜</Text>
        <Pressable onPress={() => setisModalVisible(true)}>
          <View
            style={{
              borderWidth: 2,
              borderColor: firstday.length > 2 ? '#5585E8' : '#C4C4C4',
              borderRadius: 4,
              height: 36,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            pointerEvents="none">
            <Input
              editable={false}
              myPlanName="여행명"
              value={
                firstday.length === 0 ? '' : firstday + '   ~   ' + lastday
              }
              color="#767676"
              type={planday}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              style={styles.input}
              placeholder="여행 기간 및 날짜를 입력하세요"
              placeholderTextColor="#767676"
              fontSize={14}
              marginLeft={10}
              onChangeText={(value: any) => setplanday(value)}
            />
            <IonIcon
              name="calendar-outline"
              size={18}
              style={{
                marginRight: 10,
                color: firstday.length === 0 ? 'gray' : '#5585E8',
                fontWeight: '400',
              }}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.containertwo}>
        <Text style={styles.textname}>출발 위치 등록</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('지도추가', {
              type: 'start',
            })
          }>
          <View
            style={{
              borderWidth: 2,
              borderColor: search ? '#5585E8' : '#C4C4C4',
              borderRadius: 4,
              height: 36,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            pointerEvents="none">
            <Input
              editable={false}
              myPlanName="여행명"
              value={
                search
                  ? search.name +
                    `(${search.vicinity ? search.vicinity : '정보가없습니다'})`
                  : ''
              }
              // value={search.name}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              style={styles.input}
              placeholder="여행을 시작하는 위치를 등록해주세요"
              placeholderTextColor="#767676"
              fontSize={14}
              marginLeft={10}
              name="location-outline"
              size={18}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.containertwo}>
        <Text style={styles.textname}>도착 위치 등록</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('지도추가', {
              type: 'end',
            })
          }>
          <View
            style={{
              borderWidth: 2,
              borderColor: endsearch ? '#5585E8' : '#C4C4C4',
              borderRadius: 4,
              height: 36,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            pointerEvents="none">
            <Input
              editable={false}
              myPlanName="여행명"
              value={
                endsearch
                  ? endsearch.name +
                    `(${
                      endsearch.vicinity ? endsearch.vicinity : '정보가없습니다'
                    })`
                  : ''
              }
              // value={search.name}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              style={styles.input}
              placeholder="여행을 시작하는 위치를 등록해주세요"
              placeholderTextColor="#767676"
              fontSize={14}
              marginLeft={10}
              name="location-outline"
              size={18}
            />
          </View>
        </Pressable>

        <Modal
          style={styles.modal}
          isVisible={isModalVisible}
          backdropColor={'#000000CC'}
          backdropOpacity={0.5}
          onBackdropPress={close}>
          <Calendars
            title="asssdsdds"
            close={closeOutside}
            onTouchOutside={close}
          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: 40,
    height: 40,
    backgroundColor: '#5585E8',
    borderRadius: 20,
    padding: 5,
    fontSize: 14,
    alignSelf: 'flex-end',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 10,
    color: 'rgba(255, 255, 255, 1)',
  },
  toggledOn: {
    backgroundColor: '#fff',
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
    transform: [
      // {
      // rotate: '50deg',
      // },
      {scaleX: 1},
    ],
  },
  textname: {
    paddingBottom: 8,
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },

  containertwo: {
    marginBottom: 24,
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    fontSize: 12,
    padding: 5,
    borderWidth: 2,
  },

  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalmap: {
    borderRadius: 10,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'absolute',
    top: '5%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Textplanform;
function alert(_arg0: string) {
  throw new Error('Function not implemented.');
}
