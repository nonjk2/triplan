import React, {Component, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity,Dimensions} from 'react-native';
import ComplainText from './components/complaintext';
import ComplainImage from './components/complainimage';
import Modal from "react-native-modal";
import CheckModal from '../../../util/forms/checkProccess';
import axios from 'axios';
import { ServerURL } from '../../../util/misc';
import { useSelector } from 'react-redux';

const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
function ComplainScreen({navigation}) {
    const USERDATA=useSelector((state)=> state.user.auth)
    const [isFilled,setisFilled]=useState(false)
    const [isAccessAleatOpen,setisAccessAleatOpen]=useState(false)
    const [complainName,setcomplainName]=useState('')
    const [complain,setcomplain]=useState('')
    const accessToken = useSelector((state)=>state.user.auth?.accessToken)
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress = {()=>close()}><Text style={{color : complainName.length>0 && complain.length >0 ? '#5585E8' : '#000000' }}>저장</Text></TouchableOpacity>
          ),
        });
      }, [navigation,complain,complainName]);
    
    const close = useCallback(() => {

        axios.post(`${ServerURL}/questions`, {
            complainName : complainName,
            complain : complain,
            imageSource : "임의입니다",
        },
        {
            headers : {
                "X-AUTH-TOKEN" : accessToken
        }})
        .then(function (response) {
            alert("완료")
            console.log(response)
        }).catch(function (error) { 
            // 오류발생시 실행
            console.log(error)
        }).then(function() {
            // 항상 실행
        });
    },[])
    
    const sendComplete = () => {
        setisAccessAleatOpen(true)
    }

    
    return (
        <SafeAreaView style = {{ flex :1 ,backgroundColor : '#fff' }}>
            <View style = {{paddingLeft : 16, marginTop :48}}>
                <Text style = {{ fontSize : 12 , fontWeight : '400' , color : '#767676'}}>* 서비스를 이용하면서 불편사항을 겪고 계신가요?{"\n"}문의사항을 주시면 빠른 시일내에 해결하겠습니다.</Text>
            </View>
            <ComplainText 
                complain = {complain} complainName={complainName} setcomplain={setcomplain} setcomplainName={setcomplainName}    
            />
            <ComplainImage/>
            <View style ={{ alignItems : 'center' ,marginBottom : 30}}>
            <TouchableOpacity 
                onPress = {()=> {
                    sendComplete()
                }}
                disabled = {complainName.length > 0 && complain.length > 0 ?   false :true  } 
                style = {{ backgroundColor : complainName.length>0 && complain.length >0 ? '#5585E8' : '#767676' , width : 343, height : 49, alignItems : 'center' ,justifyContent : 'center', borderRadius : 5,marginRight : 16}}
                >
                <Text style = {{color : 'white', fontSize : 14,}}>보내기</Text>
            </TouchableOpacity>
            </View>
            <Modal
                style = {styles.modal}
                isVisible={isAccessAleatOpen}
                backdropColor={'#000000CC'}
                backdropOpacity={0.5}
                animationIn={'fadeIn'}
                    >
                        <CheckModal
                            close={close}
                        />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        alignItems: 'center',
        justifyContent : 'center',
        

        
      },
});

export default ComplainScreen;
