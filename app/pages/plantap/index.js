import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView} from 'react-native';
import ScheduleTap from './components/scheduleTap';

class Plantap extends Component {


  state = {
    isLoading : true ,
    location : [],
    value : '문래자이'
  }

  // getSerchLoc = async () =>{


  //   const search = this.state.value;
  //   try {
  //     if (search==="") {
  //       this.setState({
  //         location : [], isLoading : false
  //       })
  //     }else{
  //       const {data : {
  //         items
  //       }} = await axios.get(`https://openapi.naver.com/v1/search/local.json`,{
  //         params : {
  //           query : search,
  //           display : 10,
  //         },
  //         headers : {
  //           'X-Naver-Client-Id': ID_KEY,
  //           'X-Naver-Client-Secret': SECRET_KEY
  //         }
  //       });
  //       this.setState({
  //         location : items,
  //         isLoading : false,
  //       })
        
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  render() {

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor : '#fff',
          
          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        {/* <Text>Plantap Screen</Text>
        <Button
          title="To Home Screen"
          onPress={() => {
            this.props.navigation.navigate('TRIPIAN');
          }}
        /> */}
        <ScheduleTap navigation={this.props.navigation}/>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

export default Plantap;
