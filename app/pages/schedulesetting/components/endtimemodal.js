import React, {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';




const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
function Endtimemodal(props) {

    const [endTimeProp,setendTimeProp]=useState(props.endDatetime===''? new Date() : props.endDatetime)    
    const [startTimeProp,setstartTimeProp]=useState(props.startDatetime === '' ? new Date() : props.startDatetime)
    const {setenddate,setisendModalvisible}=props;    
    const onChange = (event, selectedDate) => {
        
        const currentDate = new Date(selectedDate).getTime()
        console.log(currentDate)
        setendTimeProp(selectedDate)
      };

            const endtime = new Date(endTimeProp).getTime()
            const plantext = endtime
            return (
                <View style = {{width: 343,height: 310, borderRadius :10, shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                    <View style = {{width: 343,height: 250, borderRadius : 10,backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                        <View style ={{backgroundColor : '#E5E5E5' ,borderTopLeftRadius :10,borderTopRightRadius : 10, height : 38 , alignItems : 'center', justifyContent : 'space-between' , flexDirection: 'row'}}>
                            <View/>
                            <Text style = {{marginLeft : 20, fontSize : 16, fontWeight : '400'}}>출발 시간 설정</Text>
                            <TouchableOpacity onPress={()=> setisendModalvisible(false)} style ={{paddingRight : 5}}>
                                <IonIcon name="close-outline" size={24} style={{ fontWeight : '400'}}/>
                            </TouchableOpacity>
                        </View>
                        <View style = {{flex: 1  , justifyContent : 'center'}}>
                            <DateTimePicker
                                minimumDate={startTimeProp}
                                value={endTimeProp}
                                mode={'time'}
                                is24Hour={true}
                                display={'spinner'}
                                onChange= {onChange}
                                locale={'kr'}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        
                        onPress = {()=> setenddate(plantext,setisendModalvisible(false))}
                        style={{position: 'absolute',bottom : 1, width: 343,height: 52, borderRadius :10, backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000' , alignItems : 'center', justifyContent :'center'}}>
                           <Text style = {{color : '#5585E8'}}>확인</Text>
                    </TouchableOpacity>
                </View>
                    
                    
            );
        }

    const styles = StyleSheet.create({
        
    });
    
    export default Endtimemodal;
