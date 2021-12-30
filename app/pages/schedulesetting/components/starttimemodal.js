import React, {Component} from 'react';
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
import Inputtwo from '../../../../util/forms/input';



const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
class Starttimemodal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endtimeprops : this.props.endDatetime,
            value : this.props.startDatetime,
            form:{
                planname : {
                    value : this.props.namestate,
                    type : '',
                }
            }
        };
    }
    
    onChange = (event, selectedDate) => {
        
        const currentDate = new Date(selectedDate).getTime()
        console.log(currentDate)
        this.setState({
            value : selectedDate
        })
      };

        render() {
            const starttime = new Date(this.state.value).getTime()
            const plantext = starttime
            return (
                <View style = {{width: 343,height: 310, borderRadius :10, shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                    <View style = {{width: 343,height: 250, borderRadius : 10,backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                        <View style ={{backgroundColor : '#E5E5E5' ,borderTopLeftRadius :10,borderTopRightRadius : 10, height : 38 , alignItems : 'center', justifyContent : 'space-between' , flexDirection: 'row'}}>
                            <View/>
                            <Text style = {{marginLeft : 20, fontSize : 16, fontWeight : '400'}}>출발 시간 설정</Text>
                            <TouchableOpacity onPress={this.props.close} style ={{paddingRight : 5}}>
                                <IonIcon name="close-outline" size={24} style={{ fontWeight : '400'}}/>
                            </TouchableOpacity>
                        </View>
                        <View style = {{flex: 1  , justifyContent : 'center'}}>
                            <DateTimePicker
                                maximumDate = {this.state.endtimeprops}
                                value={this.state.value}
                                mode={'time'}
                                is24Hour={true}
                                display={'spinner'}
                                onChange= {this.onChange}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        
                        onPress = {()=> {this.props.closeandset("startdate",plantext)}}
                        style={{position: 'absolute',bottom : 1, width: 343,height: 52, borderRadius :10, backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000' , alignItems : 'center', justifyContent :'center'}}>
                           <Text style = {{color : '#5585E8'}}>확인</Text>
                    </TouchableOpacity>
                </View>
                    
                    
            );
        }
    }

    const styles = StyleSheet.create({
        
    });
    
    export default Starttimemodal;
