import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import {DummyDATA} from '../../../../../util/forms/data';

const {width: windowWidth} = Dimensions.get('window');

const data = DummyDATA;

const INITIAL_INDEX = 0;
export default function ImageCarousel(props: any) {
  const carouselRef = useRef<any>(null);
  const [, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item: any, index: any) {
    setCurrentIndex(index);
    props.setindex(index);
  }

  function renderItem({item, index}: any) {
    const {source, nickname, introduce} = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <ImageBackground
          source={{uri: source}}
          style={styles.imageBackground}
          imageStyle={{
            borderRadius: 10,
          }}>
          <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>{nickname}</Text>
          </View>
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{nickname}</Text>
          <Text style={styles.contentText}>{introduce}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={0.65 * windowWidth}
        inActiveOpacity={0.2}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
        minScrollDistance={10}
        inActiveScale={0.8}
        initialIndex={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  carousel: {
    aspectRatio: 1.2,
    paddingBottom: 20,
  },
  item: {
    width: 0.65 * windowWidth,
    height: 300,
    paddingHorizontal: 4,
  },

  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {color: 'white'},
  lowerContainer: {
    position: 'absolute',
    bottom: '7%',
    left: '10%',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  contentText: {
    marginTop: 10,
    fontSize: 12,
    color: 'white',
  },
});
