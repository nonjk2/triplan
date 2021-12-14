import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

class Plantap extends Component {

  state = {
    isLoading : true ,
    location : [],
    value : '문래자이'
  }

  getSerchLoc = async () =>{
    const ID_KEY = '7STnsJpRKt8CRM73DPpt'
    const SECRET_KEY = 'c1UCAZYQ3U'
    const search = this.state.value;
    try {
      if (search==="") {
        this.setState({
          location : [], isLoading : false
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
          }
        });
        this.setState({
          location : items,
          isLoading : false,
        })
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Plantap Screen</Text>
        <Button
          title="To Home Screen"
          onPress={() => {
            this.props.navigation.navigate('TRIPIAN');
          }}
        />
        <Button
          title="요청해보자"
          onPress={() => {
            this.getSerchLoc()
            console.log(this.state.location)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Plantap;
