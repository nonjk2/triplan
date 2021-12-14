import React, {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    Pressable,

} from 'react-native';
import Modal from "react-native-modal";
import MapViewScreen from '../../map/map';
import Calendars from './datepicker';
import Input from '../../../../util/forms/input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IonIcon from 'react-native-vector-icons/Ionicons';


/////////////////// 날짜 포맷 ///////////////////////
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

/////////////////// 날짜 포맷 ///////////////////////

class Textplanform extends Component {

    state = {
        isDatePickerVisible : false,
        isModalVisible : false,
        isModalmapVisible : false,
        firstday:'',
        lastday: '',
        myTextInput: '',
        hasErrors: false,
        form: {
            planname: {
                value: '',
                type: 'textinput',
                rules: {},
                valid: false
            },
            planday: {
                value: [],
                type: 'textinput',
                date : '',
            },
            planlocation: {
                value: '',
                type: 'textinput'
            }
        }
    }

    

    handleConfirm = (date) => {        
        this.state.form.planday.date = date.format('yyyy/MM/dd')
        console.warn("A date has been picked: ", this.state.form.planday.date);
        this.hideDatePicker();
        
    };


    updateInput = (name, value) => {
        this.setState({hasErrors: false})
        let formcopy = this.state.form;
        formcopy[name].value = value;

        this.setState({form: formcopy})
    }
    close = () => {

        this.setState({
            isModalVisible: false,
            isModalmapVisible : false
        })
       
    }
    closeOutside = (selectday) => {

        this.setState({
            isModalVisible: false,
            firstday : selectday[0],
            lastday : selectday [1]
            
        })
        console.log(this.state.firstday)
        console.log(this.state.lastday)
        
        
    }


    render() {
        const {isModalVisible,isModalmapVisible} = this.state
        
        return (

            <View style={{
                flex : 1,

            }}>
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>여행명</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 36
                            

                        }}>
                        <Input
                            myPlanName="여행명"
                            value={this.state.form.planname.value}
                            type={this.state.form.planname.type}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                            style={styles.input}
                            fontSize={14}
                            placeholder="여행명을 입력해주세요"
                            placeholderTextColor='#767676'
                            marginLeft={10}
                            maxLength = {10}
                            onChangeText={value => this.updateInput("planname", value)}></Input>
                        <Text style={{
                            alignItems: 'flex-end',
                            fontSize: 15,
                            justifyContent: 'center',
                            color: this.state.form.planname.value.length === 0 ? 'gray':'#5585E8'  ,
                            paddingRight : 2,
                        }}>{this.state.form.planname.value.length}/10</Text>
                    </View>
                </View>

                <View style={styles.containertwo}>
                    <Text style={styles.textname}>여행기간/날짜
                    </Text>
                    <Pressable onPress={() => this.setState({isModalVisible: true})}>
                        <View style = {{
                            borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 36,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center'
                            
                            
                        }} 
                            pointerEvents="none">
                            <Input
                                myPlanName="여행명"
                                // value={this.props.date[this.props.date.length-1].firstday + '  ~   ' + this.props.date[this.props.date.length-1].lastday}
                                value={this.state.firstday.length === 0 ? '' : this.state.firstday +'   ~   '+this.state.lastday} 
                                color='#767676'
                                type={this.state.form.planday.type}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="여행 기간 및 날짜를 입력하세요"
                                placeholderTextColor='#767676'
                                onFocus={this.onFocus}
                                fontSize={14}
                                marginLeft={10}
                                onChangeText={value => this.updateInput("planday", value)}/>
                            <IonIcon name="calendar-outline" size={18} style={{  marginRight : 10,color: this.state.firstday.length ===0 ? 'gray' :'#5585E8' ,fontWeight : '400'}}/>

                        </View>
                    </Pressable>

                </View>

                <View style={styles.containertwo}>
                    <Text style={styles.textname}>출발 위치 등록</Text>
                    <Pressable onPress={() => this.setState({isModalmapVisible: true})}>
                        <View 
                        style ={{borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 36,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center',
                            
                            
                        }}
                        pointerEvents ="none">
                            <Input
                                myPlanName="여행명"
                                value={this.state.myTextInput}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="여행을 시작하는 위치를 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={14}
                                marginLeft={10}

                                    
                            />
                                
                            <IonIcon name="location-outline" size={18} style={{  marginRight : 10,color: 'gray' ,fontWeight : '400'}}/>
                        </View>
                    </Pressable>
                </View>
                
                <Modal
                    style = {styles.modal}
                    isVisible={isModalmapVisible}
                    backdropColor={'#000000CC'}
                    backdropOpacity={0.5}
                    onBackdropPress={this.close}
                    
                        >
                    <MapViewScreen
                        close = {this.close}
                    />
                </Modal>

                <Modal
                    style = {styles.modal}
                    isVisible={isModalVisible}
                    backdropColor={'#000000CC'}
                    backdropOpacity={0.5}
                    onBackdropPress={this.close}
                    
                        >
                        <Calendars
                            title="asssdsdds"
                            close = {this.closeOutside}
                            onTouchOutside={this.close}
                            />
                </Modal>
            </View>
        );
    }
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
        width: '100%',
        fontSize: 12,
        padding: 5,
        borderWidth : 2,
    },
    
    modal: {
        margin: 0,
        alignItems: 'center',
        justifyContent : 'center',
        

        
      },
});

function mapStateToProps(state){
    return{
        date : state.date
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Textplanform);

