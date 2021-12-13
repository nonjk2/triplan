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

class Textsetting extends Component {

    state = {
        form: {
            nickname: {
                value: '김쫀쀼',
                type: 'textinput',
                rules: {},
                valid: false
            },
            emailId: {
                value: 'trgf456@naver.com',
                type: 'textinput',
                rules: {},
                valid: false
            },

            introduce: {
                value: '나는 똥멍청이입니다!!',
                type: 'textinput',
                date : '',
            },
        }
    }

    updateInput = (name, value) => {
        let formcopy = this.state.form;
        formcopy[name].value = value;

        this.setState({form: formcopy})
    }

    render() {
        return (
            <View style={styles.containertwo}>
                <View style = {{ marginTop :10 ,paddingBottom : 20 , paddingLeft : 16}}>
                    <Text style = {{fontSize : 18, fontWeight : '500'}}>프로필 정보</Text>
                </View>
                {/* 여기는 닉네임입니다  */}
                <View style ={{paddingHorizontal : 16,}}>
                    <Text style={styles.textname}>닉네임</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth : 2,
                            borderBottomColor : '#5585E8'

                        }}>
                        <Input
                            myPlanName="닉네임"
                            value={this.state.form.nickname.value}
                            type={this.state.form.nickname.type}
                            color='#767676'
                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder="닉네임을 입력해주세요"
                            placeholderTextColor='#767676'
                            onChangeText={value => this.updateInput("nickname", value)}></Input>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}
                    </View>
                </View>

                {/* 여기는 이메일입니다  */}
                <View style ={{paddingHorizontal : 16, paddingVertical : 24}}>
                    <Text style={styles.textname}>사용자 아이디</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth : 2,
                            borderBottomColor : '#5585E8'

                        }}>
                        <Input
                            myPlanName="이메일"
                            value={this.state.form.emailId.value}
                            color='#767676'
                            type={this.state.form.emailId.type}
                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor='#767676'
                            onChangeText={value => this.updateInput("emailId", value)}></Input>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}
                    </View>
                </View>

                {/* 여기는 소개 입니다  */}
                <View style ={{paddingHorizontal : 16,}}>
                    <Text style={styles.textname}>소개</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth : 2,
                            borderBottomColor : '#5585E8'

                        }}>
                        <Input
                            myPlanName="닉네임"
                            value={this.state.form.introduce.value}
                            color='#767676'
                            type={this.state.form.introduce.type}
                            autoCapitalize={'none'}
                            style={styles.input}
                            placeholder="자기소개를 써넣어주세요"
                            placeholderTextColor='#767676'
                            onChangeText={value => this.updateInput("introduce", value)}></Input>
                        {/* <Text style={styles.inputvalid}>{this.state.form.planname.value.length}/10</Text> */}
                    </View>
                </View>
            </View>

        )}}
const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 16,

        
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

export default Textsetting
