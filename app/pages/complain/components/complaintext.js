import React, {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    Pressable,

} from 'react-native';

import Input from '../../../../util/forms/input';
import Inputtwo from '../../../../util/forms/inputtwo';

function ComplainText(props) {
    
    const {complain,setcomplain,complainName,setcomplainName}=props;

    
    
        return (
            <View style={styles.containertwo}>
                <View style = {{ marginTop :24 ,paddingBottom : 4 , paddingLeft : 16}}>
                    <Text style = {{fontSize : 18, fontWeight : '500'}}>문의 내용</Text>
                </View>
                {/* 여기는 닉네임입니다  */}
                <View style ={{paddingHorizontal : 16,}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderWidth : 2,
                            borderRadius : 5,
                            borderColor : '#C4C4C4',
                            width : 343
                            
                        }}>
                        <Input
                            maxLength = {20}
                            myPlanName="컴플레인"
                            value={complainName}
                            color='#767676'
                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder="제목을 입력하세요.(최대 80자)"
                            placeholderTextColor='#767676'
                            onChangeText={value => setcomplainName(value)}></Input>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}
                    </View>
                    
                        <Inputtwo
                            multiline
                            numberOfLines={4}
                            myPlanName="컴플레인이름"
                            value={complain}
                            color='#767676'
                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder=" 문의하실내용을 입력하세요."
                            placeholderTextColor='#767676'
                            onChangeText={value => setcomplain(value)}
                        >

                        </Inputtwo>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}

                </View>


            </View>

        )}
const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        width : 343,
        height : 200,
        borderWidth : 2,
        borderRadius : 5,
        borderColor : '#C4C4C4',
        marginTop : 8
    },
    textname: {

        paddingBottom: 3,
        fontSize: 16,
        color: '#5585E8',
        fontWeight: '500'
    },

    containertwo: {        


    },
})

export default ComplainText
