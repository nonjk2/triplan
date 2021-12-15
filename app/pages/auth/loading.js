import React, {Component} from 'react';
import { Animated , View , Image, Dimensions } from 'react-native';

const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height

class Loading extends Component{
    constructor(props){
        super(props);
        this.state ={
            xVaule : new Animated.Value(60),
            opacity : new Animated.Value(0)
        }
    }

//////// auth 설정 /////////
    onComplete = () =>{
        const Signin = false
        if (Signin == true) {
            this.props.navigation.navigate("TRIPIAN")    
        }else{
            this.props.navigation.navigate("Firstopen")
        }
    }

    onLoad = () =>{
        Animated.timing(this.state.opacity,{
            toValue:1,
            duration : 1000,
            useNativeDriver: false
        }).start(()=>{
            this.onComplete()
        })
    }

    render(){
        return(
            <View style = {{flex :1}}>

                <Image source ={require('../../../src/assets/loading.png')}
                style ={{height : HEIGHT_MODAL, width: WIDTH}}/>

                <View style ={{ position : 'absolute' ,top : 94 , left : 20,}}>
                    {/* <Image source = {require('../../../src/assets/jenny.jpg')}/> */}
                    <Animated.Image
                        source ={require('../../../src/assets/triplan.png')}
                        style ={{


                                opacity : this.state.opacity,
                                left: this.state.opacity.interpolate({
                                    inputRange: [0,1],
                                    outputRange : [60,0]
                                })
                            }}
                        onLoad = {this.onLoad}    
                        >
                    </Animated.Image>
                </View>
            </View>
        )
    }
}
export default Loading;