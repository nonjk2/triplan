import axios from 'axios';
import React, {Component, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList, Animated, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlanListItems from './PlanListItem';

const window = Dimensions.get("window");
function Planlists(props) {
  const { headerHeight, tabBarHeight, tabRoute, listArrRef, isTabFocused } = props;
  const [data,setdata]=useState(null)
  const [loading, setLoading] = useState(null);


    const fetchData = async () => {
      setLoading(true);
      await axios.get(
        "http://172.30.1.56:9090/plans"
      ).then((res)=>setdata(res.data.list))
      .catch((e)=> console.log(e))
      setLoading(false)
    };

    useEffect(() => {
      fetchData();
    }, []);
   

  const renderPlan = ({item}) => {

    return (
      <PlanListItems
        {...props}
        plan_id = {item.planId}
        source={item.planImage}
        title={item.planTitle}
        startDatetime={item.startDateTime}
        endDatetime={item.endDateTime}
        dday={item.dday}
        navigation= {props.navigation}
      />
    );
  };

  const planlist = plans => {
    return plans.map(plan => {
      return Object.assign(plan, {key: plan.key});
    });
  };

  const keyExtractor = useCallback((item, index) => index.toString(), []);

    return (

      <View style = {{marginTop : 10}}>
        {loading ? <View style ={{flex:1 ,justifyContent : 'center' , alignItems :'center'}}><Text>로딩중..</Text></View> : 
        <Animated.FlatList
          ref={(ref)=>{
              let foundIndex = listArrRef.current.findIndex((e) => e.key === tabRoute.key);
                if (foundIndex === -1) {
                    listArrRef.current.push({
                        key: tabRoute.key,
                        value: ref
                    });
                } else {
                    listArrRef.current[foundIndex] = {
                        key: tabRoute.key,
                        value: ref
                    }
                }
              }}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderPlan}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            paddingTop: headerHeight,
            minHeight: window.height + headerHeight - tabBarHeight
          }}
          scrollEventThrottle={16}
          onScroll={
              isTabFocused?
              Animated.event(
              [{ nativeEvent: { contentOffset: { y: props.scrollY } } }],
              { useNativeDriver: true }
              ):
              null
          }
          onMomentumScrollBegin={props.onMomentumScrollBegin}
          onMomentumScrollEnd={props.onMomentumScrollEnd}
          onScrollEndDrag={props.onScrollEndDrag}
          bounces={false}
        />
      }
      </View>
    );
  }


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
},
itemContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
},
itemText: {
    fontSize: 25,
    color: "#FFD800"
},
});

export default Planlists;
