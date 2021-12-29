import axios from 'axios';
import React, {Component, memo} from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, Pressable, Platform} from 'react-native';
import Input from '../../../util/forms/input';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import NameModal from './components/namemodal';
import Starttimemodal from './components/starttimemodal';
import Endtimemodal from './components/endtimemodal';
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

class ScheduleSetting extends Component {
  constructor(props){
    super(props);
    this.state = {
        value : '',
        isNameModalvisible : false , 
        isstartModalvisible : false,
        isendModalvisible : false,
        show : false,
        startdate : this.props.route.params.startDatetime,
        enddate : this.props.route.params.endDatetime,
        form : {
            planname :{
                value :this.props.route.params.title,
                type : '',
            },
            memo : {
                value : this.props.route.params.memo
            },
            price : {
                value : this.props.route.params.price
            }
        }
    }
  }
  closeandset = (planupdate) =>{
    this.setState({
        form : {
            ...this.state.form,

            planname : {
            value : planupdate
            },
        }
    },()=> this.close())
  }


  updateInput = (name, value) => {
    this.setState({hasErrors: false})
    let formcopy = this.state.form;
    formcopy[name].value = value;

    this.setState({form: formcopy})
}

 onChange = (event, selectedDate) => {
    const selectday = new Date(selectedDate)
    this.setState({
        startdate : selectday
    })
    console.log(new Date(selectedDate).getHours())
  };

  close = () => {
    this.setState({
        isNameModalvisible: false,
        isstartModalvisible : false,
        isendModalvisible : false

    })
   
}

  render() {
    const {params} = this.props.route
    const planstart = new Date(this.state.startdate).toLocaleString('en-US', { hour: '2-digit', hour12: true ,minute :'2-digit'})
    const planend = new Date(this.state.enddate).toLocaleString('en-US', { hour: '2-digit', hour12: true ,minute :'2-digit'})
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
                    value={this.state.form.planname.value}
                    type={this.state.form.planname.type}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    style={{}}
                    fontSize={24}
                    placeholderTextColor='#767676'
                    marginLeft={10}
                    maxLength = {15}
                    onChangeText={value => this.updateInput("planname", value)}>
                </Input>
                <TouchableOpacity onPress={() => this.setState({isNameModalvisible: true})} >
                    <Text style = {{color : '#5585E8'}}>편집</Text>
                </TouchableOpacity>    
            </View>
            <Modal
                style = {styles.modal}
                isVisible={this.state.isNameModalvisible}
                backdropColor={'#000000CC'}
                backdropOpacity={0.5}
                onBackdropPress={this.close}
            >
                <NameModal
                    namestate = {this.state.form.planname.value}
                    close = {this.close}
                    closeandset = {this.closeandset}
                />
            </Modal>
            <View style ={{marginHorizontal : 16 , marginTop : 24}}>

                {/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}{/* 출발시간 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>출발 시간</Text>
                    <Pressable onPress = {() => this.setState({isstartModalvisible : true})}>
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
                                value={`${planstart}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={14}
                                marginLeft={10} 
                            />
                                
                            <IonIcon name="location-outline" size={18} style={{  marginRight : 10,color: 'gray' ,fontWeight : '400'}}/>
                        </View>
                    </Pressable>
                    <Modal
                    style = {styles.modal}
                    isVisible={this.state.isstartModalvisible}
                    backdropColor={'#000000CC'}
                    backdropOpacity={0.5}
                    onBackdropPress={this.close}
                        >
                        <Starttimemodal
                            startDatetime = {this.state.startdate}
                            close = {this.close}
                            closeandset = {this.closeandset}
                        />
                    </Modal>
                    
                </View>
                {/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}{/* 도착시간 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>도착 시간</Text>
                    <Pressable onPress = {() => this.setState({isendModalvisible : true})}>
                        <View 
                        style ={{borderWidth : 2,
                            borderColor : '#C4C4C4',
                            borderRadius : 4,
                            height : 36,
                            justifyContent : 'space-between',
                            flexDirection : 'row',
                            alignItems :'center',
                            
                            
                        }}>
                            <Input
                                myPlanName="여행명"
                                value={`${planend}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={14}
                                marginLeft={10} 
                            />
                                
                            <IonIcon name="location-outline" size={18} style={{  marginRight : 10,color: 'gray' ,fontWeight : '400'}}/>
                        </View>
                    </Pressable>
                    <Modal
                    style = {styles.modal}
                    isVisible={this.state.isendModalvisible}
                    backdropColor={'#000000CC'}
                    backdropOpacity={0.5}
                    onBackdropPress={this.close}
                        >
                        <Endtimemodal
                            endDatetime = {this.state.enddate}
                            close = {this.close}
                            closeandset = {this.closeandset}
                        />
                    </Modal>
                    
                </View>
                {/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}{/* 메모 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>메모</Text>
                    <Pressable onPress = {() => this.setState({show : true})}>
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
                                value={`${this.state.form.memo.value}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={14}
                                marginLeft={10} 
                            />
                                
                            <IonIcon name="location-outline" size={18} style={{  marginRight : 10,color: 'gray' ,fontWeight : '400'}}/>
                        </View>
                    </Pressable>                    
                </View>
                {/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}{/* 가격책정 */}
                <View style={styles.containertwo}>
                    <Text style={styles.textname}>가격책정</Text>
                    <Pressable onPress = {() => this.setState({show : true})}>
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
                                value={`${this.state.form.price.value}`}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={styles.input}
                                placeholder="시간 일정을 등록해주세요"
                                placeholderTextColor='#767676'
                                fontSize={14}
                                marginLeft={10} 
                            />
                                
                            <IonIcon name="location-outline" size={18} style={{  marginRight : 10,color: 'gray' ,fontWeight : '400'}}/>
                        </View>
                    </Pressable>                    
                </View>

            </View>        
                
      </SafeAreaView>
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

export default ScheduleSetting;
