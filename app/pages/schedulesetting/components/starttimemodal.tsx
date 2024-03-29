import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

function Starttimemodal(props: any) {
  const [endTimeProp] = useState(
    props.endDatetime === '' ? new Date() : props.endDatetime,
  );
  const [startTimeProp, setstartTimeProp] = useState(
    props.startDatetime === '' ? new Date() : props.startDatetime,
  );
  const {setstartdate, setisstartModalvisible} = props;
  const onChange = useCallback((event, selectedDate) => {
    console.log(new Date(selectedDate).toISOString());
    setstartTimeProp(selectedDate);
  }, []);

  const starttime = new Date(startTimeProp).getTime();
  const plantext = starttime;
  return (
    <View
      style={{
        width: 343,
        height: 310,
        borderRadius: 10,
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.1,
        shadowColor: '#000',
      }}>
      <View
        style={{
          width: 343,
          height: 250,
          borderRadius: 10,
          backgroundColor: '#fff',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.1,
          shadowColor: '#000',
        }}>
        <View
          style={{
            backgroundColor: '#E5E5E5',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 38,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View />
          <Text style={{marginLeft: 20, fontSize: 16, fontWeight: '400'}}>
            출발 시간 설정
          </Text>
          <TouchableOpacity
            onPress={() => setisstartModalvisible(false)}
            style={{paddingRight: 5}}>
            <IonIcon
              name="close-outline"
              size={24}
              style={{fontWeight: '400'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <DateTimePicker
            maximumDate={endTimeProp}
            value={startTimeProp}
            mode={'time'}
            is24Hour={true}
            display={'spinner'}
            onChange={onChange}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setstartdate(plantext, setisstartModalvisible(false))}
        style={{
          position: 'absolute',
          bottom: 1,
          width: 343,
          height: 52,
          borderRadius: 10,
          backgroundColor: '#fff',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.1,
          shadowColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#5585E8'}}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Starttimemodal;
