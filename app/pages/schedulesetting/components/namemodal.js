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




import Inputtwo from '../../../../util/forms/input';



const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
class NameModal extends Component {
        constructor(props) {
            super(props);
            this.state = {

                form:{
                    planname : {
                        value : this.props.namestate,
                        type : '',
                    }
                }
            };
        }
        



        updateInput = (name, value) => {
            this.setState({hasErrors: false})
            let formcopy = this.state.form;
            formcopy[name].value = value;
        
            this.setState({form: formcopy})
        }
        render() {
            const plantext = this.state.form.planname.value
            return (
                <View style = {{width: 343,height: 184, borderRadius :10, shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                    <View style = {{width: 343,height: 122, borderRadius : 10,backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                        <View style ={{backgroundColor : '#E5E5E5' ,borderTopLeftRadius :10,borderTopRightRadius : 10, height : 38 , alignItems : 'center', justifyContent : 'space-between' , flexDirection: 'row'}}>
                            <View/>
                            <Text style = {{marginLeft : 20, fontSize : 16, fontWeight : '400'}}>여행 제목 편집</Text>
                            <TouchableOpacity onPress={this.props.close} style ={{paddingRight : 5}}>
                                <IonIcon name="close-outline" size={24} style={{ fontWeight : '400'}}/>
                            </TouchableOpacity>
                        </View>
                        <View style = {{alignItems : 'center', justifyContent :'center' ,flex: 1 }}>
                            <Inputtwo
                                myPlanName="여행명"
                                value={this.state.form.planname.value}
                                type={this.state.form.planname.type}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                style={{}}
                                fontSize={24}
                                placeholderTextColor='#767676'
                                marginLeft={10}
                                numberOfLines={4}
                                onChangeText={value => this.updateInput("planname", value)}
                        />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress = {()=> {this.props.closeandset("planname",plantext)}}
                        style={{position: 'absolute',bottom : 1, width: 343,height: 52, borderRadius :10, backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000' , alignItems : 'center', justifyContent :'center'}}>
                           <Text style = {{color : this.props.namestate === plantext? '#C4C4C4': plantext.length < 2 ? '#C4C4C4': '#5585E8'}}>확인</Text>
                    </TouchableOpacity>
                </View>
                    
                    
            );
        }
    }

    const styles = StyleSheet.create({
        
    });
    
    export default NameModal;
