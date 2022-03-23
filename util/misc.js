import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

export const ServerURL = 'http://175.211.163.10:9090';

export const setToken = async (value, callback) => {
  const firstPair = ['@triplan_app@email', value.email];
  const secondPair = ['@triplan_app@token', value.accessToken];
  const thirdPair = ['@triplan_app@refToken', value.refreshToken];

  try {
    await AsyncStorage.multiSet([firstPair, secondPair, thirdPair], () =>
      callback(),
    );
  } catch (e) {
    //save error
  }

  console.log('Done.', firstPair, secondPair, thirdPair);
};

export const getToken = async callback => {
  let values;
  try {
    values = await AsyncStorage.multiGet([
      '@triplan_app@email',
      '@triplan_app@token',
      '@triplan_app@refToken',
    ]).then(values => {
      callback(values);
    });
  } catch (e) {
    // read error
  }
  console.log(values);
  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
};
