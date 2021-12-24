import React, {Component} from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ScheduleList from './scheduleList';


export default class ScheduleTap extends Component {
  constructor(props){
    super(props);
    

  this.state = {
    index: 0,
    routes: [
      { key: 'ScheduleList', title: 'DAY1' },
      { key: 'first', title: 'DAY2' },
      { key: 'second', title: 'DAY3' },
    ],
  };
}
 _renderScene = ({ route }) => {
  switch (route.key) {
    case 'ScheduleList':
      return <ScheduleList navigation={this.props.navigation} />;
    case 'first':
      return <ScheduleList navigation={this.props.navigation} />;
    case 'second':
      return <ScheduleList navigation={this.props.navigation} />;
    default:
      return null;
  }
};
  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}
        >
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.7

            ),
          });
         
          return (
            <TouchableOpacity
              style={{
                borderBottomWidth : 1,
                borderBottomColor : this.state.index === i ? '#5585E8' : '#fff',
                padding: 6,
                margin : 10,
                marginBottom : 10,
                marginVertical : 5,
    
              }}
              key={i}
              onPress={() => this.setState({ index: i })}>
                
              <Animated.Text
              style={{ 
                color : this.state.index === i ? '#5585E8' : '#000',
                opacity ,
                fontWeight : this.state.index === i ? 'bold' : 'normal',
                fontSize : 16,
                
              }}
              >{route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <TabView

        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom : 15,
    marginTop : 10,


  },
  tabItem: {

    
  },
  textcolorone: {
    color : "#5585E8",
    fontWeight : 'bold',
    fontSize : 16,
  },
  textcolortwo: {
    color : "#fff",
    fontWeight : 'bold',
    fontSize : 16,
  },
});
