import React, {Component} from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ScheduleList from './scheduleList';
import { Scheduledata } from '../../../../../util/forms/data';

const DATA = Scheduledata


export default class ScheduleTap extends Component {
  constructor(props){
    super(props);
    this.state = {
      planday : this.props.planday,
      index: 0,
      route : [
        // { key: 'ScheduleList', title: 'DAY1' },
        // { key: 'first', title: 'DAY2' },
        // { key: 'second', title: 'DAY3' },
      ],
      routes: this.plandays(),
    };
  }

  componentDidMount(){

  }
  plandays = () => {
    const {planday} = this.props
    const startdate = new Date(this.props.startDate).getDate()
    const routes = []
    for (let i = 0; i < planday; i++) {
      routes.push({
        key : `${i+1}`,
        title : `DAY${i+1}`,
        startDate : startdate,
      })
    }
    return routes
  }

 _renderScene = ({ route }) => {
   const planday = this.props.planday
  switch (route.key) {
    case '1':
      return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate}/>;
    case '2':
      return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+1}/>;
    case '3':
      return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+2}/>;
    case '4':
    return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+3 }/>;
    case '5':
    return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+4}/>;
    case '6':
    return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+5}/>;
    case '7':
    return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+6}/>;
    case '8':
    return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+7}/>;
    case '9':
    return <ScheduleList navigation={this.props.navigation} startDate ={route.startDate+8}/>;
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
    const {planday}=this.state;
    return (
      planday != 1 ? 
      <TabView
        scrollEnabled={false}
        swipeEnabled={false}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
        : <ScheduleList navigation={this.props.navigation} startDate ={new Date(this.props.startDate).getDate()}/> 
        //<View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center'}}><Text style = {{fontSize : 15 , color : '#c4c4c4'}}>일정이 없습니다 일정을 추가해주세요</Text></View>
    
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
