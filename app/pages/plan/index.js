import React, {Component, useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,

} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Carousel from './components/Carousel';
import {dummydata} from './components/CaroucelData';
import { Header } from './components/header';
import { TabView, SceneMap } from 'react-native-tab-view';
import Planlists from './components/PlanList';
import { PlanData } from '../../../util/forms/data';
import { useSelector } from 'react-redux';

import axios from 'axios';
const DATA = []
const TABBAR_HEIGHT = 55;
function HomeScreen(props) {
    const user= useSelector((state)=>state.user.auth)
    const [ headerHeight, setHeaderHeight ] = useState(0);
    const [ tabRoutes, setTabRoutes ] = useState([
      { key: 'planlists', title: '전체' },
      { key: 'first', title: '다가올 여행' },
      { key: 'second', title: '다녀온 여행' },
    ],)
    const tabIndexRef = useRef(0);
    const [ tabIndex, setTabIndex ] = useState(0);
    const isListGlidingRef = useRef(false);
    const listArrRef = useRef([]);
    const listOffsetRef = useRef({});
    
    
    
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerTranslateY = scrollY.interpolate({
      inputRange: [0, headerHeight],  
      outputRange: [0, -headerHeight],
      extrapolate: "clamp"
    })

    
    const tabBarTranslateY = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 40],
      extrapolateRight: 'clamp'
    });

    useEffect(()=>{
      scrollY.addListener(({ value })=>{});

      return () => {
          scrollY.removeListener();
      }
    }, [tabIndex]);

    const headerOnLayout = useCallback((event)=>{
      const { height } = event.nativeEvent.layout;
      setHeaderHeight(height);
    }, []);
    
    const onTabIndexChange = useCallback((id)=>{
      setTabIndex(id);
      tabIndexRef.current = id;
    }, []);

    const onTabPress = useCallback((idx)=>{
      if(!isListGlidingRef.current) {
          setTabIndex(idx);
          tabIndexRef.current = idx;
      }
    }, []);

    const syncScrollOffset = ()=>{
      const focusedTabKey = tabRoutes[tabIndexRef.current].key;

      listArrRef.current.forEach((item)=>{
          if (item.key !== focusedTabKey) {
              if (scrollY._value < headerHeight && scrollY._value >= 0) {
                  if (item.value) {
                      item.value.scrollToOffset({
                          offset: scrollY._value,
                          animated: false,
                      });
                      listOffsetRef.current[item.key] = scrollY._value;
                  }
              } else if (scrollY._value >= headerHeight) {
                  if ( listOffsetRef.current[item.key] < headerHeight ||
                       listOffsetRef.current[item.key] === null) {
                      if (item.value) {
                          item.value.scrollToOffset({
                              offset: headerHeight,
                              aniamted: false,
                          });
                          listOffsetRef.current[item.key] = headerHeight;
                      }
                  }
              }
          } else{
              if (item.value) {
                  listOffsetRef.current[item.key] = scrollY._value;
              }
          }
      })
  }

  const onMomentumScrollBegin = useCallback(()=>{
    isListGlidingRef.current = true;
}, []);
  const onMomentumScrollEnd = useCallback(()=>{
      isListGlidingRef.current = false;
      syncScrollOffset();
  }, [ headerHeight ]);
  const onScrollEndDrag = useCallback(()=>{
      syncScrollOffset();
  }, [ headerHeight ]);
    


  const renderScene = useCallback(({ route })=>{
    const isFocused = route.key === tabRoutes[tabIndex].key;

    return (
      <Planlists 
        headerHeight={headerHeight} 
        tabBarHeight={TABBAR_HEIGHT} 
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin} 
        onMomentumScrollEnd={onMomentumScrollEnd} 
        onScrollEndDrag={onScrollEndDrag}
        tabRoute={route} 
        listArrRef={listArrRef} 
        isTabFocused={isFocused} 
        {...props} 
      />
    )
  }, [ headerHeight, tabIndex ]);

  
    const renderTabBar = useCallback((props)=>{
      const inputRange = props.navigationState.routes.map((x, i) => i);
      return (
          <Animated.View style={[{flexDirection: "row",
            alignItems: "center",
            height: TABBAR_HEIGHT,
            backgroundColor: "#FFFFFF",
            borderBottomWidth : headerHeight == 0 ? 2 : 0  ,
            borderColor :'#5585E8',
            zIndex: 1,},{ transform: [ { translateY: tabBarTranslateY } ] } ]}>

              {props.navigationState.routes.map((route, idx) => {
                    const opacity = props.position.interpolate({
                                inputRange,
                                outputRange: inputRange.map((inputIndex) =>
                                  inputIndex === idx ? 1 : 0.7
                                ),
                              });
                      return (
                          <TouchableOpacity
                              style={{flex :1 ,borderBottomWidth : 2,borderBottomColor : tabIndex === idx ? '#5585E8AA': '#fff'}}
                              key={idx}
                              onPress={()=>{ onTabPress(idx) }}
                          >
                              <View style={styles.collapsibleTabBarLabelContainer}>
                                  <Animated.Text style={{ 
                                    color : tabIndex === idx ? '#5585E8' : '#000',
                                    opacity ,
                                    fontWeight : tabIndex === idx ? 'bold' : 'normal',
                                    fontSize : 16,
                                    
                                  }}>{route.title}
                                  </Animated.Text>
                              </View>
                          </TouchableOpacity>
                      );
                  })
              }        
          </Animated.View>
      )
    }, [ headerHeight,tabIndex ]);
    
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          
          backgroundColor: '#fff',
        }}>
        {
          headerHeight > 0?
          <TabView
              navigationState={{ index: tabIndex, routes: tabRoutes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={onTabIndexChange}
          />:
          null
        }  
        {/* <PlanTabView key={props.key} navigation = {props.navigation} /> */}
        
        <Animated.View 
          onLayout={headerOnLayout}
          pointerEvents="box-none"
          style ={{position : 'absolute', width :'100%', transform: [ { translateY: headerTranslateY } ]}}>
          <Header
            containerStyle={{
              height: 40,
              marginTop : 40,
              alignItems: 'center',
            }}
          />
          <View style={{flexWrap: 'wrap', zIndex :1000}}>
            <Carousel data={dummydata} />
          </View>
        </Animated.View>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('여행 추가');
        }}
        style={{
          width: 60,
          height: 60,
          position: 'absolute',
          bottom: 118,
          right: 20,
        }}>
        <View>
          <Image source={require('../../../src/assets/Button.jpg')} />
        </View>
      </TouchableOpacity>
    </View>
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
  rootContainer: {
    flex: 1,
},
headerContainer: {
    position: "absolute",
    width: "100%",
},
collapsibleTabBar: {
    flexDirection: "row",
    alignItems: "center",
    height: TABBAR_HEIGHT,
    backgroundColor: "#FFFFFF",

    borderColor :'#5585E8',
    zIndex: 1,
},
collapsibleTabBarButton: {
    flex: 1,
},
collapsibleTabBarLabelContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
},
collapsibleTabBarLabelText: {
    fontSize: 15,
    color: "#587058"
},
});

export default HomeScreen;
