import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

class CheckModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }

  render() {
    return (
      <View
        style={{
          width: 343,
          height: 208,
          borderRadius: 10,
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.1,
          shadowColor: '#000',
        }}>
        <View
          style={{
            width: 343,
            height: 208,
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowOffset: {width: 2, height: 4},
            shadowOpacity: 0.1,
            shadowColor: '#000',
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LottieView
              source={require('../../src/lottie/38700-check-icon.json')}
              progress={this.state.progress}
              style={{width: 80, height: 80}}
              colorFilters={[
                {
                  keypath: 'button',
                  color: '#F00000',
                },
                {
                  keypath: 'Sending Loader',
                  color: '#F00000',
                },
              ]}
            />
            <Text>보내기 완료!</Text>
          </View>
        </View>
        {/* <TouchableOpacity
                        onPress = {()=> {this.props.close()}}
                        style={{position: 'absolute',bottom : 1, width: 343,height: 52, borderRadius :10, backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000' , alignItems : 'center', justifyContent :'center'}}>
                           <Text style = {{color : '#5585E8'}}>확인</Text>
                    </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default CheckModal;
