import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

class ScheduleListitems extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        // console.warn(this.props.planday)
    }
  
  render() {
    //   console.log(this.props.dday)
      
      const statedate = new Date(this.props.startDatetime)
    return (
        <View style ={{
            width : WIDTH -32 , 
            height : 84 ,
            marginBottom : 8,
            flex :1,
            borderLeftColor : this.props.schedule_id%2 == 0 ? '#5585E8' : '#FF5B27', 
            borderLeftWidth : 3.5,
            backgroundColor : '#fff',
            marginLeft : 16,
            shadowOffset : {
                width: 3,
                height : 3,
            },

            shadowColor : '#000000',
            shadowOpacity : 0.25,

            }}>
            <View style = {{  flex : 1,marginHorizontal : 20 , marginVertical : 12, flexDirection : 'row' ,}}>
                <View style ={{ shadowOpacity: 0,flex : 1, justifyContent :'center',}}>
                    <Text>
                        {+new Date(this.props.startDatetime).getHours()+"시"}{new Date(this.props.startDatetime).getMinutes()+"분"}{`\n`}
                               {`\n`}
                        {+new Date(this.props.endDatetime).getHours()+"시"}{new Date(this.props.endDatetime).getMinutes()+"분"}{`\n`}
                    </Text>
                </View>
                <View style ={{flex : 3 ,  justifyContent : 'center'}}>
                    <Text style = {{fontWeight : '400' , fontSize : 16,}}>{this.props.title}</Text>
                    <Text style = {{fontSize : 14, color : '#767676' ,marginVertical : 2,}}>{this.props.memo}</Text>
                    <Text style = {{fontSize : 14, color : '#5585E8'}}>{this.props.price}원</Text>

                </View>
                
                <View style ={{flex : .5 , justifyContent : 'center' ,alignItems :'flex-end'}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('일정 편집',{
                                title : this.props.title,
                                memo : this.props.memo,
                                price : this.props.price,
                                startDatetime : this.props.startDatetime,
                                endDatetime : this.props.endDatetime
                            } );
                            
                          }}
                    >
                        <IonIcon name="ellipsis-vertical" size={20}/>
                    </TouchableOpacity>
                </View>

                
            </View>

        </View>
       
    );
  }
}

class Dday extends Component {
    
    render() {
        let bagroundColor = ''
        let Ddayy =''
        let bagroundWidth = ''
        
        if(this.props.tpye === '완료'){

            bagroundColor = '#000'
            Ddayy = ''
            bagroundWidth = 45
        }else if(this.props.tpye === '진행중'){

            bagroundColor = 'red'
            bagroundWidth = 55
        }   
        else{
            bagroundColor = '#5585E8'
            Ddayy = 'D-'
            bagroundWidth = 50
        }
        return (
            
            <View style = {{
                height : 9,
                width : bagroundWidth,
                backgroundColor : bagroundColor,
                
                flex : 1,
                marginBottom : 10,
                borderRadius : 10,  
                textAlign : 'center',
                justifyContent : 'center',
            }}>
                <Text style = {{
                    color : 'white',
                    fontSize : 15,
                    textAlign : 'center',
                    fontWeight : '700',
                    justifyContent : 'center',
                }}>{Ddayy}{this.props.tpye}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listbutton : {
        flexDirection : 'row',
        flexWrap : 'wrap'

    },
    planlistimage : {
        width : 197,
        height : 120,
        borderRadius : 10,
        flexWrap : 'wrap',
    },
    plancontain : {
        flex : 2,
        marginLeft : 10,
    },
    ddaystyle : {
        
        backgroundColor : "#5585E8",
        borderRadius : 30,
        color : 'white',
    },
    plannamestyle : {


        fontSize : 15,
        padding : 2,

    },
    ddayTextView : {
        flex : 1,
        alignItems : 'flex-start',
        
    },
    plantextView : {
        textAlignVertical : 'center',
        flex : 3,

        
    }


});

export default ScheduleListitems;
