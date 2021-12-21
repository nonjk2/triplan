import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Image} from 'react-native';








class PlanListItems extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
  
  render() {
      console.log(this.props.dday)
      
    return (
        <TouchableOpacity style ={{
            marginBottom : 8, 
        }}
        onPress={() => {
            this.props.navigation.navigate('plan');
          }}
        >
            <View style = {styles.listbutton}>
                <Image source = {{uri : this.props.source}} style = {styles.planlistimage}/>
                <View style = {styles.plancontain}>
                    <Dday tpye = {this.props.dday}/>
                    <View style = {styles.plantextView}>
                        <Text style = {styles.plannamestyle}>{this.props.planname}</Text>
                        <Text style = {{
                            padding : 2,
                            fontSize : 14,
                            fontWeight : '400',

                            color : this.props.dday === '진행중' ? 'red' : this.props.dday < 40 ? '#5585E8' : '#000',
                            
                            }}>{this.props.day}</Text>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
       
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

export default PlanListItems;
