import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapViewScreen from '../../map/map';
import ImageCarousel from './components/Caroucel';
import { Scheduledata } from '../../../../util/forms/data';

const DATA = Scheduledata
const INITIAL_INDEX = 0;
export default function Maptap(props) {
  const [index,setindex]=useState(INITIAL_INDEX)
  // useEffect(()=>{
  //   console.log(index)
  // })


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <MapViewScreen
          caroucelIndex={index}
        />
        <View style ={{position : 'absolute' , bottom : '1%'}}>
          <ImageCarousel
            setindex={setindex}
          />
        </View>
    </View>
  );
}


const styles = StyleSheet.create({});

