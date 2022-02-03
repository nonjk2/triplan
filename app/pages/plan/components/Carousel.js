import React, {Component, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import CarouselItem from './CarouselItem';

const {width, height} = Dimensions.get('window');

// function infiniteScroll(dataList) {
//   const flatlist = this.flatlist;
//   const numberofata = dataList.length;
//   let scrollValue = 0,
//     scrolled = 0;

//   setInterval(function (params) {
//     scrolled++;
//     if (scrolled < numberofata) scrollValue = scrollValue + width;
//     else {
//       scrollValue = 0;
//       scrolled = 0;
//     }
//     flatlist.scrollToOffset({animated: true, offset: scrollValue});
//   }, 20000);
// }

const Carousel = ({data}) => {
  if (data && data.length) {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState(data);

    // useEffect(() => {
    //   // setDataList(data);
    //   // infiniteScroll(dataList);
    // });

    return (
      <View>
        <View style ={{width : 99, height : 24, position : 'absolute'  , top : -10, zIndex : 1 ,backgroundColor : '#5585E8', alignItems : 'center' , justifyContent : 'center'}}>
          <Text style = {{fontSize : 12 ,fontWeight : '400', color : '#fff'}}>이달의 추천지</Text>
        </View>
        <FlatList
          data={data}
          ref={flatlist1 => {
            try {
              this.flatlist = flatlist1;  
            } catch (error) {
              flatlist1 = flatlist1;
              console.log(error)
            }
            
          }}  
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={32}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <CarouselItem item={item} />;
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
        />

        <View style={styles.doView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: '#595959',
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  doView: {
    justifyContent : 'center',
    flexDirection: 'row',
    position : 'absolute',
    top : 190 ,
    right : 40 ,
    
    
    
  },
});

export default Carousel;
