import React, {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    Pressable,
    TouchableOpacity,

} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Input from '../../../../util/forms/input';

function Textsetting(props) {
    

        return (
            <View style={styles.containertwo}>
                <View style = {{ marginTop :37 ,paddingBottom : 20 , paddingLeft : 16}}>
                    <Text style = {{fontSize : 18, fontWeight : '500' , color : '#5585E8'}}>프로필 정보</Text>
                </View>
                {/* 여기는 닉네임입니다  */}
                <View style ={{paddingHorizontal : 16,}}>
                    <Text style={styles.textname}>닉네임</Text>
                    <View
                        style={{
                            borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 36,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center'

                        }}>
                        <Input
                            myPlanName="닉네임"
                            value={props.nickname}
                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder="닉네임을 입력해주세요"
                            placeholderTextColor='#C4C4C4'
                            onChangeText={value => props.setnickname(value)}></Input>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}
                        <TouchableOpacity style={{position : 'absolute' ,right : 5,}} onPress = {()=> {props.setnickname("")}}>    
                                <IonIcon name="close-circle-outline" size={18} style={{color: 'gray' ,fontWeight : '400'}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 여기는 이메일입니다  */}
                <View style ={{paddingHorizontal : 16, paddingVertical : 24}}>
                    <Text style={styles.textname}>사용자 아이디</Text>
                    <View
                        style={{
                            borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 36,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center'
                            
                        }}
                        pointerEvents='none'
                        >
                        <Input
                            editable ={false}
                            myPlanName="이메일"
                            value={props.email}
                            color='#C4C4C4'
                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor='#767676'
                            onChangeText={value =>  props.setemail(value)}></Input>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}
                    </View>
                </View>

                {/* 여기는 소개 입니다  */}
                <View style ={{paddingHorizontal : 16,}}>
                    <Text style={styles.textname}>소개</Text>
                    <View
                        style={{
                            borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 36,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center'

                        }}>
                        <Input
                            
                            myPlanName="자기소개"
                            value={props.aboutMe}

                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder="자기소개를 써넣어주세요"
                            placeholderTextColor='#767676'
                            onChangeText={value => props.setabuoutMe(value)}></Input>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}
                        <TouchableOpacity style={{position : 'absolute' ,right : 5,}} onPress = {()=> {props.setabuoutMe("")} }>    
                                <IonIcon name="close-circle-outline" size={18} style={{color: 'gray' ,fontWeight : '400'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )}
const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 16,

        
    },
    textname: {
        
        paddingBottom: 8,
        fontSize: 16,
        color: '#000',
        fontWeight: '400'
    },

    containertwo: {        


    },
})

export default Textsetting
