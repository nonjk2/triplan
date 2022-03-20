import React, {useEffect} from 'react';
import {View, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';

const WIDTH = Dimensions.get('window').width;

function ScheduleListitems(props: any) {
  useEffect(() => {}, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.navigate('일정 편집', {
          title: props.title,
          memo: props.memo,
          price: props.price,
          startDatetime: props.startDatetime,
          endDatetime: props.endDatetime,
        });
      }}>
      <View
        style={{
          width: WIDTH - 32,
          height: 84,
          marginBottom: 8,
          flex: 1,
          borderLeftColor: props.schedule_id % 2 === 0 ? '#5585E8' : '#FF5B27',
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
          <View style={{shadowOpacity: 0, flex: 1, justifyContent: 'center'}}>
            <Text>
              {+new Date(props.startDatetime).getHours() + '시'}
              {new Date(props.startDatetime).getMinutes() + '분'}
              {'\n'}
              {'\n'}
              {+new Date(props.endDatetime).getHours() + '시'}
              {new Date(props.endDatetime).getMinutes() + '분'}
              {'\n'}
            </Text>
          </View>
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

export default ScheduleListitems;
