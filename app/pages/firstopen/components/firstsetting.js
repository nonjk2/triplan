import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import Input from '../../../../util/forms/input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
class SettingContents extends Component {
    state={
        nickname : '',
        introduce : '',
    }
    updateInput = (name , value) =>{
        
        this.setState({
            [name] : value
        })
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
                                borderColor : '#C4C4C4',
                                borderRadius : 10,
                                height : 50,
                                justifyContent : 'space-between',
                                flexDirection : 'row',
                                alignItems :'center',
                                marginBottom : 16
                            }}
                        >
                    <Input
                        value={this.state.nickname}
                        autoCapitalize={'none'}
                        style={styles.input}
                        fontSize={14}
                        placeholder="닉네임을 입력해주세요"
                        placeholderTextColor='#767676'
                        marginLeft={10}
                        maxLength = {10}
                        onChangeText={value => this.updateInput("nickname",value)}
                        
                    />
                    <IonIcon name="person-outline" size={18} style={{  marginRight : 10,color: this.state.nickname.length < 3 ? 'gray' :'#5585E8' ,fontWeight : '400'}}/>
                </View>

                <View style = {{
                                borderWidth : 1,
                                borderColor : '#C4C4C4',
                                borderRadius : 10,
                                height : 50,
                                justifyContent : 'space-between',
                                flexDirection : 'row',
                                alignItems :'center'
                            }}>
                    <Input 
                        value={this.state.introduce}
                        autoCapitalize={'none'}
                        style={styles.input}
                        fontSize={14}
                        placeholder="자기소개를 입력해주세요"
                        placeholderTextColor='#767676'
                        marginLeft={10}
                        maxLength = {10}
                        onChangeText={value => this.updateInput("introduce",value)}
                        
                    />
                    <IonIcon name="reader-outline" size={18} style={{  marginRight : 10,color: this.state.introduce.length < 10 ? 'gray' :'#5585E8' ,fontWeight : '400'}}/>
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
                    <TouchableOpacity>
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
        </View>
    )}
}

const styles = StyleSheet.create({
    input : {
        
    }
});

function mapStateToProps(state){
    return{
        date : state.date
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default SettingContents
