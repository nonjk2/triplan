import React, {Component, useEffect, useRef, useState} from 'react';
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
import Inputtwo from '../../../../util/forms/input';


const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
function NameModal(props) {
    const {setplanname,setisNameModalvisible,type}=props;
    const [plantitle,setplantitle]=useState(props.planname)
    
    return (
        <View style = {{width: 343,height: 184, borderRadius :10, shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
            <View style = {{width: 343,height: 122, borderRadius : 10,backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                <View style ={{backgroundColor : '#E5E5E5' ,borderTopLeftRadius :10,borderTopRightRadius : 10, height : 38 , alignItems : 'center', justifyContent : 'space-between' , flexDirection: 'row'}}>
                    <View/>
                    <Text style = {{marginLeft : 20, fontSize : 16, fontWeight : '400'}}>여행 제목 편집</Text>
                    <TouchableOpacity onPress={()=> setisNameModalvisible(false)} style ={{paddingRight : 5}}>
                        <IonIcon name="close-outline" size={24} style={{ fontWeight : '400'}}/>
                    </TouchableOpacity>
                </View>
                <View style = {{alignItems : 'center', justifyContent :'center' ,flex: 1 }}>
                    <Inputtwo

                        myPlanName="여행명"
                        value={plantitle}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'}
                        placeholder="여행 제목"
                        style={{}}
                        fontSize={24}
                        placeholderTextColor='#c4c4c4'
                        marginLeft={10}
                        numberOfLines={4}
                        onChangeText={value => setplantitle(value)}
                />
                </View>
            </View>
            <TouchableOpacity
                disabled ={props.planname === plantitle? true: plantitle < 2 ? true: false}
                onPress = {()=>setplanname(plantitle,setisNameModalvisible(false))}
                style={{position: 'absolute',bottom : 1, width: 343,height: 52, borderRadius :10, backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000' , alignItems : 'center', justifyContent :'center'}}>
                    <Text style = {{color : props.planname === plantitle? '#C4C4C4': plantitle < 2 ? '#C4C4C4': '#5585E8'}}>확인</Text>
            </TouchableOpacity>
        </View>
            
            
    );
}


    const styles = StyleSheet.create({
        
    });
    
    export default NameModal;
