import axios from 'axios';
import React, {Component, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Button ,SafeAreaView ,Dimensions ,Pressable ,TouchableOpacity} from 'react-native';
import Input from '../../../util/forms/input';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import Starttimemodal from '../schedulesetting/components/starttimemodal';
import Endtimemodal from '../schedulesetting/components/endtimemodal';
import NameModal from '../schedulesetting/components/namemodal';
import { ServerURL } from '../../../util/misc';
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
function AddplanSetting(props) {
  
    const [isNameModalvisible,setisNameModalvisible] = useState(false)
    const [isstartModalvisible,setisstartModalvisible] = useState(false)
    const [isendModalvisible,setisendModalvisible] = useState(false)
    const [show,setshow]=useState(false)
    const [startdate,setstartdate]=useState('')
    const [enddate,setenddate]=useState('')
    const [planname,setplanname]=useState('')
    const [memo,setmemo]=useState('')
    const [price,setprice]=useState('')

    const planstart = new Date(startdate).toLocaleString('en-US', { hour: '2-digit', hour12: true ,minute :'2-digit'})
    const planend = new Date(enddate).toLocaleString('en-US', { hour: '2-digit', hour12: true ,minute :'2-digit'})
    const close = () => {
        
        setisNameModalvisible(false)
        setisendModalvisible(false)
        setisstartModalvisible(false)
    }
    useEffect(() => {
        props.navigation.setOptions({ 
          headerRight: () => (
            <TouchableOpacity
                style={{padding : 0}}
                onPress = {()=>
                    AddplanSettingDetail()
                    // console.log(new Date(startdate).toISOString())
                }
                disabled = {false}
            >
                <Text style={{color : startdate&&enddate&&memo&&price?'#5585E8' : '#000'}}>
                    저장
                </Text>
            </TouchableOpacity>
          ),
        });
      }, [props.navigation,price,memo,planname]);

      const AddplanSettingDetail = () => {
        axios.post(`${ServerURL}/schedules`,
        {    
            planId : props.route.params.plan_id,
            scheduleTitle : planname,
            price : price,
            startDateTime : new Date(startdate).toISOString(),
            endDateTime : new Date(enddate).toISOString(),
            memo : memo,
            // map : []
        })
        .then(function (response) {
            alert("완료")
            props.navigation.navigate('스케쥴')
        }).catch(function (error) { 
            console.log(error)
            alert("실패")
        })
    // async await 함수를 사용할 때, 
      }

    
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
                    placeholder='여행 제목 입력'
                    placeholderTextColor='#c4c4c4'
                    marginLeft={10}
                    maxLength = {15}
                    >
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
                    type = 'addplandetail'
                    setisNameModalvisible = {setisNameModalvisible}
                    planname = {planname}
                    setplanname={setplanname}
                />
            </Modal>
            <View style ={{marginHorizontal : 16 , marginTop : 24}}>

                {/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>출발 시간</Text>
                    <Pressable onPress = {() => {setisstartModalvisible(!isstartModalvisible)}}>
                        <View 
                        style ={{
                            borderWidth : 2,
                            borderColor : !startdate ? '#C4C4C4' : '#5585E8',
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
                                value={startdate===''? '' : `${planstart}`}
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
                    <Pressable onPress = {() => {setisendModalvisible(!isendModalvisible)}}>
                        <View 
                        style ={{
                            borderWidth : 2,
                            borderColor : !enddate ? '#C4C4C4' : '#5585E8',
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
                                value={enddate===''? '' : `${planend}`}
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
                            borderColor : !memo ? '#C4C4C4' : '#5585E8',
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
                                onChangeText={(value)=>setmemo(value)} 
                            />
                            <TouchableOpacity 
                                onPress = {() => setmemo('')}
                                style={{position : 'absolute' ,right : 5,}} onPress = {()=> setmemo("")}>    
                                <IonIcon name="close-circle-outline" size={18} style={{color: 'gray' ,fontWeight : '400'}}/>
                            </TouchableOpacity>
                        </View>
                    </Pressable>                    
                </View>
                {/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>가격책정</Text>
                        <View 
                        style ={{borderWidth : 2,
                            borderColor : !price ? '#C4C4C4' : '#5585E8',
                            borderRadius : 4,
                            height : 50,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center',
                        }}>
                            <Input
                                myPlanName="여행명"
                                value={`${price}`}
                                autoCapitalize={'none'}
                                keyboardType={'number-pad'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={16}
                                marginLeft={10}
                                onChangeText={(text)=>setprice(text)} 
                            />
                            <TouchableOpacity 
                                onPress = {() => setprice('')}
                                style={{position : 'absolute' ,right : 5,}}>    
                                <IonIcon name="close-circle-outline" size={18} style={{color: 'gray' ,fontWeight : '400'}}/>
                            </TouchableOpacity>   
                              
                        </View>

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

export default AddplanSetting;
