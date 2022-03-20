import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import NaverMapView, {Marker, Path} from '../../map';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {MYAPI_KEY} from '../../../../util/forms/data';
import axios from 'axios';
import {ServerURL} from '../../../../util/misc';
import {useSelector} from 'react-redux';

const P0 = {
  latitude: 37.59229660205149,
  longitude: 126.97558048678314,
  index: 0,
};
const P1 = {
  latitude: 37.821181701506276,
  longitude: 127.54229189686288,
  index: 1,
};
interface DIFF {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
const getDateDiff = (date1: any, date2: any) => {
  const diff: any = new Date(date2.getTime() - date1.getTime());
  return {
    year: (diff.getUTCFullYear() - 1970) as any,
    month: diff.getUTCMonth() as any,
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds(),
  };
};
const formatDate = (date: any) => {
  let d = new Date(date),
    month = (d.getMonth() + 1).toString(),
    day = d.getDate().toString(),
    year = d.getFullYear().toString();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

function PlanListItems(props: any) {
  const futureDate = new Date(props.startDatetime);
  const [toggleon, settoggleon] = useState(false);
  const {navigation, source, plan_id} = props;
  const mapView = useRef<any>();
  const [currentLocation] = useState(P0);
  const accessToken = useSelector((state: any) => state.user.auth?.accessToken);
  const [diff, setDiff] = useState({} as DIFF);
  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(getDateDiff(new Date(), futureDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const planday = () => {
    const start = new Date(props.startDatetime);
    const end = new Date(props.endDatetime);
    const startday = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate(),
    );
    const endday = new Date(
      end.getFullYear(),
      end.getMonth() + 1,
      end.getDate(),
    );
    const btMs = endday.getTime() - startday.getTime();
    const btDay = btMs / (1000 * 60 * 60 * 24);
    return btDay + 1;
  };

  function Dday(propst: any) {
    let bagroundColor = '';
    if (propst.tpye === '완료') {
      bagroundColor = '#000';
    } else if (propst.tpye === '진행중') {
      bagroundColor = 'red';
    } else {
      bagroundColor = '#5585E8';
    }

    return (
      <View
        style={
          toggleon
            ? {
                height: 25,
                width: 60,
                backgroundColor: bagroundColor,
                position: 'absolute',
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
              }
            : {
                height: 25,
                width: '100%',
                backgroundColor: bagroundColor,
                // flex : 1,
                marginBottom: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                justifyContent: 'center',
              }
        }>
        {toggleon ? (
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              textAlign: 'center',
              fontWeight: '700',
              justifyContent: 'center',
            }}>
            ㅁ
          </Text>
        ) : (
          <Text
            style={{
              color: 'white',
              fontSize: 10,
              textAlign: 'right',
              fontWeight: '700',
              justifyContent: 'center',
            }}>
            {`${formatDate(futureDate)} 까지
                ${diff.month} 월 ${diff.day} 일 ${diff.hour} 시 ${
              diff.minute
            } 분 ${diff.second}`}
            초
          </Text>
        )}
      </View>
    );
  }

  const DeletePlan = async () => {
    await axios
      .delete(`${ServerURL}/plans/${plan_id}`, {
        headers: {
          'X-AUTH-TOKEN': accessToken,
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));
  };
  return (
    <View style={{marginBottom: 8, marginLeft: 5}}>
      <TouchableOpacity
        disabled={toggleon ? true : false}
        style={{backgroundColor: toggleon ? '#f5f5f5' : '#fff'}}
        onPress={() => settoggleon(!toggleon)}
        onLongPress={() =>
          Alert.alert(
            '',
            '삭제하시겠습니까?',
            [
              {text: '확인', onPress: () => DeletePlan()},
              {text: '취소', onPress: () => console.log('')},
            ],
            {cancelable: false},
          )
        }>
        <Animatable.View
          style={[styles.listbutton, toggleon && styles.listbuttonOn]}
          transition={['height']}>
          {toggleon ? (
            <NaverMapView
              ref={mapView}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: 30,
                flex: 1,
                top: 0,
              }}
              showsMyLocationButton={false}
              scrollGesturesEnabled={false}
              scaleBar={false}
              zoomGesturesEnabled={false}
              stopGesturesEnabled={true}
              zoomControl={false}
              center={{...currentLocation, zoom: 8, tilt: 5, bearing: 5}}
              buildingHeight={10}
              nightMode={false}
              mapType={0}
              useTextureView>
              {/* {searchdata.name ?  */}
              <Marker
                coordinate={P0}
                caption={{
                  text: '출발',
                }}
                width={30}
                height={50}
                onClick={() => mapView.current.animateToTwoCoordinates(P0, P1)}
                zIndex={1000}
                isHideCollidedCaptions={false}
                animated={true}
              />
              <Path
                coordinates={[P0, P1]}
                width={5}
                color={'#5585E8'}
                outlineWidth={0.5}
                passedColor={'green'}
                outlineColor={'red'}
                passedOutlineColor={'#c4c4c4'}
                progress={0}
                zIndex={999}
              />
              <Marker
                coordinate={P1}
                caption={{
                  text: '도착',
                }}
                width={30}
                height={50}
                onClick={() => mapView.current.animateToTwoCoordinates(P0, P1)}
                zIndex={1000}
                animated={true}
              />

              {/* :
                            null
                            } */}
            </NaverMapView>
          ) : source ? (
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${props.source}&key=${MYAPI_KEY}`,
              }}
              style={styles.planlistimage}
            />
          ) : (
            <View
              style={{
                ...styles.planlistimage,
                backgroundColor: '#c4c4c4',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text> 이미지 없음 </Text>
            </View>
          )}
          <Animatable.View
            style={[styles.plancontain, toggleon && styles.plancontainOn]}>
            <Dday tpye={props.dday} />
            <Animatable.View
              transition={['borderWidth', 'height', 'width']}
              style={[styles.plantextView, toggleon && styles.plantextViewOn]}>
              <Text
                style={[
                  styles.plannamestyle,
                  toggleon && styles.plannamestyleOn,
                ]}>
                {props.title}
              </Text>
              <Text
                style={{
                  padding: 2,
                  fontSize: 14,
                  fontWeight: '400',

                  color:
                    props.dday === '진행중'
                      ? 'red'
                      : props.dday < 40
                      ? '#5585E8'
                      : '#000',
                }}>
                {' '}
                {new Date(props.startDatetime).getMonth() + 1 + '월'}
                {new Date(props.startDatetime).getDate() + '일'}~
                {new Date(props.endDatetime).getMonth() + 1 + '월'}
                {new Date(props.endDatetime).getDate() + '일'}
              </Text>
            </Animatable.View>
          </Animatable.View>
          {toggleon ? (
            <>
              <TouchableOpacity
                // onPress={()=> mapView.current.animateToTwoCoordinates(P0,P1)}
                onPress={() => settoggleon(false)}
                style={{
                  backgroundColor: '#5585E8',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  position: 'absolute',
                  right: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                  shadowOpacity: 0.25,
                  shadowOffset: {width: 0, height: 5},
                }}>
                <IonIcon
                  name={'chevron-down-outline'}
                  size={25}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('plan', {
                    key: props.key,
                    planday: planday(),
                    startDate: props.startDatetime,
                    endDate: props.endDatetime,
                    name: props.title,
                    source: props.source,
                    plan_id: plan_id,
                  });
                }}
                style={{
                  backgroundColor: '#fff',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  position: 'absolute',
                  right: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 50,
                  shadowOpacity: 0.25,
                  shadowOffset: {width: 0, height: 5},
                }}>
                <IonIcon
                  name={'ellipsis-horizontal'}
                  size={15}
                  color={'#000'}
                />
              </TouchableOpacity>
            </>
          ) : null}
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listbutton: {
    flexDirection: 'row',
    height: 120,
    borderWidth: 0,
  },
  listbuttonOn: {
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 400,
    borderWidth: 2,
    borderColor: '#5585E8',
    borderRadius: 10,
  },
  planlistimage: {
    width: 197,
    height: 120,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  plancontainOn: {
    // justifyContent : 'center'
    // flexDirection : 'row',
    marginTop: 10,
  },
  plancontain: {
    flex: 2,
    marginLeft: 10,
  },
  ddaystyle: {
    backgroundColor: '#5585E8',
    borderRadius: 30,
    color: 'white',
  },
  plannamestyle: {
    fontSize: 15,
    padding: 2,
  },
  plannamestyleOn: {
    fontSize: 18,
    fontWeight: '400',
    padding: 2,
  },
  ddayTextView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  plantextViewOn: {
    alignSelf: 'center',
    alignItems: 'center',
    // borderWidth :0,
    width: 150,
    height: 20,
  },
  plantextView: {
    // textAlignVertical : 'center',
    // flex : 3,
    // borderWidth :1,
    width: 150,
    height: 43,
  },
});

export default PlanListItems;
