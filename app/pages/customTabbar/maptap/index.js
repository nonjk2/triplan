import React, {Component, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Button, Dimensions, TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import MapViewScreen from '../../map/map';
import ImageCarousel from './components/Caroucel';
import { Scheduledata } from '../../../../util/forms/data';
import Inputtwo from '../../../../util/forms/inputtwo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const INITIAL_INDEX = 0;
export default function Maptap(props) {
  const {navigation}=props
  const {DATA,planday,startDate}=props.route.params;
  const [index,setindex]=useState(INITIAL_INDEX)
  const [dayindex,setdayindex]=useState(0)
  const [MarkerDATA,setMarkerDATA]=useState(DATA.filter(e=>new Date(e.startDatetime).getDate()===new Date(startDate).getDate()))
  const Markerview = useRef(null)
  
    return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <MapViewScreen
          caroucelIndex={index}
          dayindex = {dayindex}
          startDate = {startDate}
          DATA = {DATA}
          setdayindex ={setdayindex}
          MarkerDATA = {MarkerDATA}
          Markerview = {Markerview}
          planday={planday}

        />
        <View style ={{position : 'absolute' , bottom : '1%'}}>
          <ImageCarousel
            setindex={setindex}
          />
        </View>
        <View style ={{
          position : 'absolute' , 
          top : '10%' , 
          alignItems :'center',
          justifyContent :'center' , 
          flexDirection :'row', 
          width : WIDTH - 32,
          height : 50,
          backgroundColor : '#fff',
          borderRadius : 10,
          }}>
        <IonIcon name="menu-outline" onPress={()=>navigation.openDrawer()} size={24} style={{color: '#000' , position : 'relative' , right : 5}}/>
        {/* <TouchableWithoutFeedback onPress={()=>navigation.navigate("지도핀검색")}> */}
        <Inputtwo
          style={styles.input}
          placeholder ={'핀 검색을 하려면 터치해 주세요'}
          returnKeyType={'google'}
          editable={false}

        />
        {/* </TouchableWithoutFeedback> */}
        <IonIcon name="mic-outline" onPress={()=>navigation.navigate("지도핀검색")} size={24} style={{color: '#000' ,fontWeight : '400' , position : 'relative' , left : 5}}/>
        
        </View>
        
    </View>
  );
}


const styles = StyleSheet.create({
  input:{
    backgroundColor : '#fff',
    width : WIDTH * 0.7,
    height : 50
    
  }
  
});

