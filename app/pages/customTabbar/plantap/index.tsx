import React from 'react';
import {View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import ScheduleTap from './components/scheduleTap';

function Plantap(props: any) {
  const {params} = props.route;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ScheduleTap
        plan_id={params.plan_id}
        planday={params.planday}
        navigation={props.navigation}
        startDate={params.startDate}
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('일정추가', {
            plan_id: params.plan_id,
          });
        }}
        style={{
          width: 60,
          height: 60,
          position: 'absolute',
          bottom: 118,
          right: 20,
        }}>
        <View>
          <Image source={require('../../../../src/assets/Button.jpg')} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Plantap;
