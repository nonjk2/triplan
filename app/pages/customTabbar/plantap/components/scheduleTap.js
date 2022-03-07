import React, {Component, useEffect, useState} from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ScheduleList from './scheduleList';
import { Scheduledata } from '../../../../../util/forms/data';

const DATA = Scheduledata


 function ScheduleTap(props){
    const {plan_id} = props;
    const [planday , setplanday]= useState(props.planday)
    const [Tabindex,setTabindex] =useState(0)
    const plandays = () =>{
      const startdate = new Date(props.startDate).getDate()
      const route = []
      for (let i = 0; i < planday; i++) {
        route.push({
          key : `${i+1}`,
          title : `DAY${i+1}`,
          startDate : startdate,
        })
      }
      return route;
    };
    const [routes , setroutes] = useState(plandays())

    
 const _renderScene = ({ route }) => {
  switch (route.key) {
    case '1':
      return <ScheduleList navigation={props.navigation} startDate ={route.startDate} plan_id={plan_id}/>;
    case '2':
      return <ScheduleList navigation={props.navigation} startDate ={route.startDate+1} plan_id={plan_id}/>;
    case '3':
      return <ScheduleList navigation={props.navigation} startDate ={route.startDate+2} plan_id={plan_id}/>;
    case '4':
    return <ScheduleList navigation={props.navigation} startDate ={route.startDate+3 } plan_id={plan_id}/>;
    case '5':
    return <ScheduleList navigation={props.navigation} startDate ={route.startDate+4} plan_id={plan_id}/>;
    case '6':
    return <ScheduleList navigation={props.navigation} startDate ={route.startDate+5} plan_id={props.plan_id}/>;
    case '7':
    return <ScheduleList navigation={props.navigation} startDate ={route.startDate+6} plan_id={props.plan_id}/>;
    case '8':
    return <ScheduleList navigation={props.navigation} startDate ={route.startDate+7} plan_id={props.plan_id}/>;
    case '9':
    return <ScheduleList navigation={props.navigation} startDate ={route.startDate+8} plan_id={props.plan_id}/>;
    default:
      return null;
  }
};
  const _handleIndexChange = ((index) => setTabindex(index))

  const _renderTabBar = (props) => {
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
                borderBottomColor : Tabindex === i ? '#5585E8' : '#fff',
                padding: 6,
                margin : 10,
                marginBottom : 10,
                marginVertical : 5,
    
              }}
              key={i}
              onPress={() => setTabindex(i)}>
                
              <Animated.Text
              style={{ 
                color : Tabindex === i ? '#5585E8' : '#000',
                opacity ,
                fontWeight : Tabindex === i ? 'bold' : 'normal',
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

    return (
      planday != 1 ? 
      <TabView
        scrollEnabled={false}
        swipeEnabled={false}
        navigationState={{index : Tabindex , routes : routes}}
        renderScene={_renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
      />
        : <ScheduleList navigation={props.navigation} startDate ={new Date(props.startDate).getDate()}/> 
        //<View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center'}}><Text style = {{fontSize : 15 , color : '#c4c4c4'}}>일정이 없습니다 일정을 추가해주세요</Text></View>
    
    );
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

export default ScheduleTap
