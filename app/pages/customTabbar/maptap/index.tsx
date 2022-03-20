/* eslint-disable no-shadow */

import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageCarousel from './components/Caroucel';
import Inputtwo from '../../../../util/forms/inputtwo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import NaverMapView, {Marker} from '../../map';

const WIDTH = Dimensions.get('window').width;
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
const P2 = {
  latitude: 37.67639982426067,
  longitude: 127.86638861746769,
  index: 2,
};
const P4 = {
  latitude: 37.368526562915974,
  longitude: 127.92040466073564,
  index: 3,
};
const P5 = {
  latitude: 37.255661731852015,
  longitude: 127.665888045982,
  index: 5,
};
const MyArray = [P0, P1, P2, P4, P5];
const INITIAL_INDEX = 0;
export default function Maptap(props: any) {
  const {navigation} = props;
  const {DATA, planday, startDate} = props.route.params;
  const [index, setindex] = useState(INITIAL_INDEX);
  const [dayindex, setdayindex] = useState(0);
  const [MarkerDATA] = useState(
    DATA.filter(
      (e: any) =>
        new Date(e.startDatetime).getDate() === new Date(startDate).getDate(),
    ),
  );
  const mapView = useRef<any>(null);
  const [toggleon, settoggleon] = useState(false);
  useEffect(() => {
    // requestLocationPermission()
    mapView.current.animateToCoordinate(MyArray[index]);
    // setCurrentLocation(MyArray[index])
  });
  const [myMarker, setmyMarker] = useState(MarkerDATA);
  const setDay = (index: any) => {
    setdayindex(index);
    setmyMarker(
      DATA.filter(
        (e: any) =>
          new Date(e.startDatetime).getDate() ===
          new Date(startDate).getDate() + index,
      ),
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <NaverMapView
        ref={mapView}
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={false}
        scaleBar={false}
        nightMode={false}
        zoomControl={false}
        mapType={0}
        useTextureView>
        {myMarker.map((e: any) => {
          return (
            <Marker
              width={24}
              height={24}
              coordinate={e.map_id}
              zIndex={1000}
              key={e.schedule_id}
              animated={true}
            />
          );
        })}
      </NaverMapView>
      <View
        style={{
          position: 'absolute',
          top: '18%',
          flexDirection: 'row',
          width: WIDTH - 32,
          height: 40,
          alignContent: 'flex-start',
        }}>
        {[...Array(planday)].map((e, index) => {
          return (
            <TouchableWithoutFeedback onPress={() => setDay(index)} key={index}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  width: 69,
                  height: 40,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: dayindex === index ? '#5585E8' : '#767676',
                    fontWeight: '500',
                  }}>
                  DAY{index + 1}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      {toggleon ? (
        <View style={{position: 'absolute', bottom: '1%'}}>
          <ImageCarousel setindex={setindex} />
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: '25%',
          right: 20,
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          backgroundColor: '#fff',
          borderRadius: 15,
          shadowOpacity: 0.25,
          shadowOffset: {width: 0, height: 5},
        }}
        onPress={() => settoggleon(!toggleon)}>
        <IonIcon name="menu-outline" size={24} color={'#000'} />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          top: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: WIDTH - 32,
          height: 50,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <IonIcon
          name="menu-outline"
          onPress={() => navigation.openDrawer()}
          size={24}
          style={{color: '#000', position: 'relative', right: 5}}
        />
        {/* <TouchableWithoutFeedback onPress={()=>navigation.navigate("지도핀검색")}> */}
        <Inputtwo
          style={styles.input}
          placeholder={'핀 검색을 하려면 터치해 주세요'}
          returnKeyType={'google'}
          editable={false}
        />
        <IonIcon
          name="mic-outline"
          onPress={() => navigation.navigate('지도핀검색')}
          size={24}
          style={{
            color: '#000',
            fontWeight: '400',
            position: 'relative',
            left: 5,
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    width: WIDTH * 0.7,
    height: 50,
  },
});
