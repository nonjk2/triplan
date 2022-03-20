import React from 'react';
import {Dimensions, LogBox, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Inputtwo from '../../../../../../util/forms/inputtwo';
LogBox.ignoreLogs(['EventEmitter.removeListener']);

const WIDTH = Dimensions.get('window').width;

export default function SearchScreen({navigation}: any) {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
      <View
        style={{
          position: 'absolute',
          top: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: WIDTH - 32,
          height: 50,
          borderRadius: 10,
          borderWidth: 0.2,
        }}>
        <IonIcon
          name="menu-outline"
          onPress={() => navigation.goBack('지도')}
          size={24}
          style={{color: '#000', position: 'relative', right: 5}}
        />
        <Inputtwo
          style={styles.input}
          placeholder={'일정 또는 핀 번호 검색'}
          returnKeyType={'google'}
        />
        <IonIcon
          name="mic-outline"
          size={24}
          style={{
            color: '#000',
            fontWeight: '400',
            position: 'relative',
            left: 5,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: WIDTH * 0.7,
    height: 50,
  },
});
