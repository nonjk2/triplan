import React, {useEffect} from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const HiddenItemWithAction = (props: any) => {
  useEffect(() => {}, []);

  return (
    <Animated.View
      style={{
        alignItems: 'flex-end',
        marginRight: 16,
        transform: [
          {
            scale: props.swipeAnimatedValue.interpolate({
              inputRange: [-80, -60, -40, -30, -20, -10, 0],
              outputRange: [1, 0.8, 0.6, 0.4, 0.2, 0.1, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <TouchableOpacity
        // onPress={onClose}
        onPress={() => {
          props.navigation.navigate('일정 편집', {
            title: props.title,
            memo: props.memo,
            price: props.price,
            startDatetime: props.startDatetime,
            endDatetime: props.endDatetime,
          });
        }}
        style={{
          backgroundColor: '#FF275B',
          width: 84,
          height: 84,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IonIcon name="remove-outline" size={35} color={'white'} />
      </TouchableOpacity>
    </Animated.View>
  );
};
