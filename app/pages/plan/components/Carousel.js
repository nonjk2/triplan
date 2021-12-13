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

let flatlist;

function infiniteScroll(dataList) {
  const numberofata = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(function (params) {
    scrolled++;
    if (scrolled < numberofata) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }
    this.flatlist.scrollToOffset({animated: true, offset: scrollValue});
  }, 6000);
}

const Carousel = ({data}) => {
  if (data && data.length) {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState(data);

    useEffect(() => {
      setDataList(data);
      infiniteScroll(dataList);
    });

    return (
      <View>
        <FlatList
          data={data}
          ref={flatlist => {
            this.flatlist = flatlist;
          }}
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
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
  console.log('please provide image');
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
