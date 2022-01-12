import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import Input from '../../../../util/forms/input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import CheckModal from '../../../../util/forms/checkProccess';
class SettingContents extends Component {
    state={
        nickname : this.props.user.nickname,
        // nickname : "adfasdfasf",
        introduce : this.props.user.aboutme,
        // introduce :  " adfasddfasdfdsaf",
        isAccessAleatOpen : false
    }
    updateInput = (name , value) =>{
        
        this.setState({
            [name] : value
        })
    }
    close = () => {
        this.setState({
            isAccessAleatOpen : false
        },()=>{})
    }
    compleate = () => {
        this.setState({
            isAccessAleatOpen : true
        })
    }
    // {닉네임 설정할때 정규화 valid!!!!!!!} ///


    iconCheck = (name) => {
        if (this.state[name] !== false && this.state[name].length > 2) {
            return <IonIcon name="checkmark-circle" size={24} style={{  marginRight : 10, color: '#5585E8' ,fontWeight : '400'}}/>        
        }else{
            return <IonIcon name="ellipse-outline" size={24} style={{  marginRight : 10, color: '#5585E8' ,fontWeight : '400'}}/>    
        }
        
    }
  render() {
    
    return (
        <View style = {{flex : 1}}>
            <View style ={{flex : 1, marginHorizontal : 32 , marginTop : 10}}>
                <View>
                    <Text style = {{marginBottom : 24 , fontSize : 22 , fontWeight : '400'}}>간단 설정을 마무리해주세요 :)</Text>
                </View>
                <View style = {{
                                borderWidth : 1,
                                borderColor : this.state.nickname !==false && this.state.nickname.length >2  ?   '#5585E8' : '#C4C4C4',
                                borderRadius : 10,
                                height : 50,
                                justifyContent : 'space-between',
                                flexDirection : 'row',
                                alignItems :'center',
                                marginBottom : 16
                            }}
                        >
                    <Input
                        value={this.state.nickname ? this.state.nickname : ""}
                        autoCapitalize={'none'}
                        style={styles.input}
                        fontSize={14}
                        placeholder="닉네임을 입력해주세요"
                        placeholderTextColor='#767676'
                        marginLeft={10}
                        maxLength = {10}
                        color = {'#767676'}
                        onChangeText={value => this.updateInput("nickname",value)}
                        
                    />
                    {this.iconCheck("nickname")}
                    
                    
                </View>

                <View style = {{
                                borderWidth : 1,
                                borderColor : this.state.introduce !==false && this.state.introduce.length >2  ?   '#5585E8' : '#C4C4C4',
                                borderRadius : 10,
                                height : 50,
                                justifyContent : 'space-between',
                                flexDirection : 'row',
                                alignItems :'center'
                            }}>
                    <Input 
                        value={this.state.introduce ? this.state.introduce : ""}
                        autoCapitalize={'none'}
                        style={styles.input}
                        fontSize={14}
                        placeholder="자기소개를 입력해주세요"
                        placeholderTextColor='#767676'
                        marginLeft={10}
                        maxLength = {10}
                        onChangeText={value => this.updateInput("introduce",value)}
                        
                    />
                    {this.iconCheck("introduce")}
                    {/* <IonIcon name="reader-outline" size={18} style={{  marginRight : 10,color: this.state.introduce.length < 10 ? 'gray' :'#5585E8' ,fontWeight : '400'}}/> */}
                </View>
            </View>

            <View style = {{flex : 1 , alignItems : 'center'}}>
                    <TouchableOpacity onPress = {()=>this.props.navigation.navigate("TRIPIAN")}>
                        <View style ={{
                                width : 343,
                                height : 52,
                                borderWidth : 1,
                                borderColor : '#C4C4C4',
                                borderRadius : 5,
                                justifyContent : 'center',
                                alignItems :'center',
                                marginBottom : 16 }}
                        >
                            <Text style ={{fontSize : 14 , fontWeight : '400' , color : '#767676'}}>건너뛰기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {()=> {
                            this.compleate()
                        }}
                    >
                        <View style ={{
                                width : 343,
                                height : 52,
                                backgroundColor : '#5585E8',
                                borderRadius : 5,
                                height : 50,
                                justifyContent : 'center',
                                alignItems :'center',
                                marginBottom : 16}}>
                                    <Text style ={{fontSize : 14 , fontWeight : '400' , color : 'white'}}>완료</Text>
                        </View>
                    </TouchableOpacity>        
                </View>
                <Modal
                    style = {styles.modal}
                    isVisible={this.state.isAccessAleatOpen}
                    backdropColor={'#000000CC'}
                    backdropOpacity={0.5}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}

                        >
                            <CheckModal
                                close={this.close}
                            />
                </Modal>
        </View>
    )}
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        alignItems: 'center',
        justifyContent : 'center',
        

        
      },
});

export default SettingContents
