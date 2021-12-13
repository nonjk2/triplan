import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity,Dimensions} from 'react-native';
import ComplainText from './components/complaintext';
import ComplainImage from './components/complainimage';
const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
class ComplainScreen extends Component {

    state ={
        isFilled : false
    }

    sendButton = (data) => {
            this.setState({isFilled : data})

    }

    render() {

        return (
            <SafeAreaView style = {{ flex :1 ,backgroundColor : '#fff' }}>
                <View style = {{paddingLeft : 16, marginTop :48}}>
                    <Text style = {{ fontSize : 12 , fontWeight : '400' , color : '#767676'}}>* 서비스를 이용하면서 불편사항을 겪고 계신가요?{"\n"}문의사항을 주시면 빠른 시일내에 해결하겠습니다.</Text>
                </View>
                <ComplainText sendButton = {this.sendButton}/>
                <ComplainImage/>
                <View style ={{ alignItems : 'center' ,marginBottom : 30}}>
                <TouchableOpacity onPress = {() => alert('asd')} disabled = {this.state.isFilled ? false : true} style = {{ backgroundColor : this.state.isFilled ? '#5585E8' : '#767676' , width : 343, height : 49, alignItems : 'center' ,justifyContent : 'center', borderRadius : 5,marginRight : 16}}>
                    <Text style = {{color : 'white', fontSize : 14,}}>보내기</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default ComplainScreen;
