import React from 'react';
import {View, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';
const WIDTH = Dimensions.get('window').width;
export default function InviteFriendsItem(props: any) {
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          width: WIDTH - 32,
          height: 84,
          marginBottom: 8,
          flex: 1,
          borderLeftColor: '#FF5B27',
          borderLeftWidth: 3.5,
          backgroundColor: '#fff',
          marginLeft: 16,
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowColor: '#000000',
          shadowOpacity: 0.25,
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginVertical: 12,
            flexDirection: 'row',
          }}>
          <View
            style={{
              shadowOpacity: 0,
              flex: 1,
              justifyContent: 'center',
            }}
          />
          <View style={{flex: 3, justifyContent: 'center'}}>
            <Text style={{fontWeight: '400', fontSize: 16}}>{props.title}</Text>
            <Text style={{fontSize: 14, color: '#767676', marginVertical: 2}}>
              {props.memo}
            </Text>
            <Text style={{fontSize: 14, color: '#5585E8'}}>
              {props.price}원
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
