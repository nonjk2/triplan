import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, Animated, SafeAreaView, FlatList} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { checkList } from '../../../../util/forms/data';
import CheckBox from '@react-native-community/checkbox';

const DATA= checkList

export default function CheckTap(params) {
  const [index,setindex]=useState(0);
  const [data,setdata]=useState(DATA)
  const [routes]=useState([
    { key: 'planlists', title: '전체' },
    { key: 'first', title: '챙긴 것' },
    { key: 'second', title: '안챙긴 것' },
  ])
  const checked = (item) =>{
            const newData = data.map(e=>{
                if(e.item_id == item.item_id){
                    return {
                        ...e,
                        isSelected : !e.isSelected,
                    }}

                return {
                    ...e,
                    isSelected : e.isSelected
                }})
            setdata(newData)            
        }
  
  const renderCheckList = ({item}) =>{
    return (
      <SafeAreaView style ={{flexDirection : 'row', width :373, height :24, marginTop :16,backgroundColor : item.isSelected ? '#fff':'#fff',alignItems :'center'}}>
        <CheckBox
          style={{width : 24 , height :24 , marginHorizontal : 8 , paddingHorizontal: 16}}
          value={item.isSelected}
          onValueChange={() => checked(item)}
          animationDuration={0.2}
          lineWidth={2}
          boxType={'square'}
          onCheckColor='#fff'
          onTintColor='#5585E8'
          onFillColor='#5585E8'
          offAnimationType='fill'
          onAnimationType='fill'
          tintColor='#000'/>
        <Text style = {{color : item.isSelected ? '#5585E8': '#000'}}>{item.item_name}</Text>   
      </SafeAreaView>
    )
  }
  const _renderScene = ({ route }) => {

    switch (route.key) {
      case 'planlists':
        return <View style ={{flex : 1,}}>
                  <FlatList
                    data={data}
                    renderItem={renderCheckList}
                    keyExtractor={data.item_id}                    
                  />
                </View>
      case 'first':
        return <View></View>
      case 'second':
        return <View></View>
      default:
        return null;
    }
  };
  const _handleIndexChange = (index) => setindex(index);

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
                borderBottomColor : index === i ? '#5585E8' : '#fff',
                padding: 6,
                margin : 10,
                marginBottom : 10,
                marginVertical : 5,
    
              }}
              key={i}
              onPress={() => setindex( i )}>
                
              <Animated.Text
              style={{ 
                color : index === i ? '#5585E8' : '#000',
                opacity ,
                fontWeight : index === i ? 'bold' : 'normal',
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
      <SafeAreaView style = {{flex : 1, backgroundColor : '#fff' }}>
      <TabView

        navigationState={{index,routes}}
        renderScene={_renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={setindex}
      />
      </SafeAreaView>
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


