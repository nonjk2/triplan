import axios from 'axios';
import React, {Component, memo, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, Pressable, Platform} from 'react-native';
import Input from '../../../util/forms/input';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import NameModal from './components/namemodal';
import Starttimemodal from './components/starttimemodal';
import Endtimemodal from './components/endtimemodal';
import Inputtwo from '../../../util/forms/inputtwo';
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

function ScheduleSetting(props) {
    
    const [isNameModalvisible,setisNameModalvisible] = useState(false)
    const [isstartModalvisible,setisstartModalvisible] = useState(false)
    const [isendModalvisible,setisendModalvisible] = useState(false)
    const [show,setshow]=useState(false)
    const [startdate,setstartdate]=useState(props.route.params.startDatetime)
    const [enddate,setenddate]=useState(props.route.params.endDatetime)
    const [planname,setplanname]=useState(props.route.params.title)
    const [memo,setmemo]=useState(props.route.params.memo)
    const [price,setprice]=useState(props.route.params.price)

    
    const onChange = (event, selectedDate) => {
        const selectday = new Date(selectedDate)
        setstartdate(selectday)
    };

    const close = () => {
        setisNameModalvisible(false)
        setisendModalvisible(false)
        setisstartModalvisible(false)
    }

    useEffect(() => {
        props.navigation.setOptions({ 
            // 
          headerRight: () => (
            <TouchableOpacity
                onPress = {()=>{}}
                disabled = {price != props.route.params.price || memo !=props.route.params.memo || planname !=props.route.params.title
                     

                    ?planname.length > 2 && memo.length > 4 ? false : true : true }
            >
                <Text style={{color : price != props.route.params.price || memo !=props.route.params.memo || planname !=props.route.params.title 
                    ?planname.length > 2 && memo.length > 4 ? '#5585E8':'#000'  : '#000'}}>
                    저장
                </Text>
            </TouchableOpacity>
          ),
        });
      }, [props.navigation,price,memo,planname]);


    const planstart = new Date(startdate).toLocaleString('en-US', { hour: '2-digit', hour12: true ,minute :'2-digit'})
    const planend = new Date(enddate).toLocaleString('en-US', { hour: '2-digit', hour12: true ,minute :'2-digit'})
    return (    
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor : '#fff',
          
        }}>
            <View style = {{ width : WIDTH , height : 60, backgroundColor : '#FAFAFA' , marginTop : 48 , alignItems : 'center', justifyContent : 'center' ,flexDirection : 'row'}}>
                <Input
                    myPlanName="여행명"
                    pointerEvents ="none"
                    value={planname}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    style={{}}
                    fontSize={24}
                    placeholderTextColor='#767676'
                    marginLeft={10}
                    maxLength = {15}
                    onChangeText={value => setplanname(value)}>
                </Input>
                <TouchableOpacity onPress={() => setisNameModalvisible(true)} >
                    <Text style = {{color : '#5585E8'}}>편집</Text>
                </TouchableOpacity>    
            </View>
            <Modal
                style = {styles.modal}
                isVisible={isNameModalvisible}
                backdropColor={'#000000CC'}
                backdropOpacity={0.5}
                onBackdropPress={close}
            >
                <NameModal
                    setisNameModalvisible = {setisNameModalvisible}
                    planname = {planname}
                    setplanname={setplanname}
                />
            </Modal>
            <View style ={{marginHorizontal : 16 , marginTop : 24}}>

                {/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>출발 시간</Text>
                    <Pressable onPress = {() => {setisstartModalvisible(true)}}>
                        <View 
                        style ={{borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 50,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center',
                            
                            
                        }}
                        pointerEvents ="none">
                            <Input
                                editable={false}  
                                pointerEvents ="none"
                                myPlanName="출발 시간"
                                value={`${planstart}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={16}
                                marginLeft={10} 
                            />
                                

                        </View>
                    </Pressable>
                    <Modal
                    style = {styles.modal}
                    isVisible={isstartModalvisible}
                    backdropColor={'#000000CC'}
                    backdropOpacity={0.5}
                    onBackdropPress={close}
                        >
                        <Starttimemodal
                            endDatetime = {enddate}
                            startDatetime = {startdate}
                            close = {close}
                            setstartdate = {setstartdate}
                            setisstartModalvisible={setisstartModalvisible}
                        />
                    </Modal>
                    
                </View>
                {/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>도착 시간</Text>
                    <Pressable onPress = {() => {setisendModalvisible(true)}}>
                        <View 
                        style ={{
                            borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 50,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center',
                        }}>
                            <Input
                                editable={false}
                                pointerEvents ="none"
                                myPlanName="도착시간"
                                value={`${planend}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={16}
                                marginLeft={10} 
                            />
                                

                        </View>
                    </Pressable>
                    <Modal
                        style = {styles.modal}
                        isVisible={isendModalvisible}
                        backdropColor={'#000000CC'}
                        backdropOpacity={0.5}
                        onBackdropPress={close}
                        >
                        <Endtimemodal
                            startDatetime = {startdate}
                            endDatetime = {enddate}
                            close = {close}
                            setenddate={setenddate}
                            setisendModalvisible={setisendModalvisible}
                        />
                    </Modal>
                    
                </View>
                {/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>메모</Text>
                    <Pressable onPress = {() => {setshow(true)}}>
                        <View 
                        style ={{borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 50,
                            // justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center',
                        }}>
                            <Input
                                maxLength = {20}
                                numberOfLines={4}
                                multiline
                                myPlanName="여행명"
                                value={`${memo}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="메모를 작성해주세요"
                                placeholderTextColor='#767676'
                                fontSize={16}
                                marginLeft={10}
                                onChangeText={value => setmemo(value)} 
                            />
                            <TouchableOpacity style={{position : 'absolute' ,right : 5,}} onPress = {()=> setmemo("")}>    
                                <IonIcon name="close-circle-outline" size={18} style={{color: 'gray' ,fontWeight : '400'}}/>
                            </TouchableOpacity>
                        </View>
                    </Pressable>                    
                </View>
                {/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>가격책정</Text>
                    <Pressable onPress = {() => setshow(true)}>
                        <View 
                        style ={{borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 50,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center',
                        }}
                        pointerEvents ="none">
                            <Input
                                myPlanName="여행명"
                                value={`${price}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={16}
                                marginLeft={10} 
                            />
                            <TouchableOpacity style={{position : 'absolute' ,right : 5,}}>    
                                <IonIcon name="close-circle-outline" size={18} style={{color: 'gray' ,fontWeight : '400'}}/>
                            </TouchableOpacity>   
                              
                        </View>
                    </Pressable>                    
                </View>

            </View>        
                
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    textname: {
        
        paddingBottom: 8,
        fontSize: 16,
        color: '#000',
        fontWeight: '400'
    },

    containertwo: {
        marginBottom: 48,
        justifyContent: 'space-between'
    },

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        width : 320,
        height : 36,
        fontSize: 12,
        borderWidth : 2,
    },
    
    modal: {
        margin: 0,
        alignItems: 'center',
        justifyContent : 'center',
        

        
      },
});

export default ScheduleSetting;
