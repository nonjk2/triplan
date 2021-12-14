import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import SearchInput from '../../../util/forms/search';
import SearchItems from './searchListitem';
import IonIcon from 'react-native-vector-icons/Ionicons';

class Mapsearch extends Component {

  state = {
    isLoading : true ,
    locationsearch : [],
    value : '',
    a : {}

  }

  getSerchLoc = async () =>{
    const ID_KEY = '7STnsJpRKt8CRM73DPpt'
    const SECRET_KEY = 'c1UCAZYQ3U'
    const search = this.state.value;
    try {
      if (search==="") {
        this.setState({
            locationsearch : [], isLoading : false
        })
      }else{
        const {data : {
          items
        }} = await axios.get(`https://openapi.naver.com/v1/search/local.json`,{
          params : {
            query : search,
            display : 10,
          },
          headers : {
            'X-Naver-Client-Id': ID_KEY,
            'X-Naver-Client-Secret': SECRET_KEY
          }});
        
        this.setState({
          locationsearch : items,
          isLoading : false,
        })    
        console.log(this.state.locationsearch)
      }
    } catch (error) {
      console.log(error)
}}

search = (text) =>{
    this.setState({
        value : text
    })
}


renderSearch = ({item}) => {
    return (
        <SearchItems
            title={item.title}
            address={item.address}
            mapX={item.mapx}
            mapY={item.mapy}
            />
    );
};
  render() {

    return (
        <View>
            <View style ={{ alignItems: 'center',width : 343, height :30,borderRadius :10, flexDirection :'row', backgroundColor : '#000' ,justifyContent : 'space-between'}}>
                <SearchInput 
                    style ={{backgroundColor :'#000'}}
                    value = {this.state.value}
                    onChangeText={(text) => this.search(text)}
                    placeholder="출발 위치를 검색해주세요"
                    backgroundColor='#000'
                    placeholderTextColor='#fff'
                    color='#fff'
                    borderRadius={5}
                    marginLeft={5}
                />
                <TouchableOpacity onPress = {() =>{this.getSerchLoc()}}>
                    <IonIcon name="search-outline" size={20} style={{color: '#fff', marginRight : 5}}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data = {this.state.locationsearch}
                renderItem = {({item})=>this.renderSearch({item})}
                numColumns={1}
                keyExtractor={item => `key-${item.title}`}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Mapsearch;
