import axios from 'axios';
import React, {Component} from 'react';
import { Animated , View , Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import kakaoLogin, { getAccessToken, login } from '@react-native-seoul/kakao-login';

const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height

class Loading extends Component{
    constructor(props){
        super(props);
        this.state ={
            xVaule : new Animated.Value(60),
            opacity : new Animated.Value(0),
            data : [],
            isKakaoLogging: false,
            accesstoken: 'token has not fetched',
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
    kakaoSignIn = () => {
        login()
        .then((result)=> {
            console.log(JSON.stringify(result))
            console.log(result)

        })
    }
    
      kakaoLogout() {
        console.log('   kakaoLogout   ');
        loginWithKakaoAccount((err, result) => {
          if (err) {
            console.log(err.toString());
            return;
          }
          alert('result', result);
        });
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
                <View style = {{position : 'absolute', bottom : 100 , left : '10%', alignItems : 'center' ,justifyContent : 'center'}}>
                    <View>
                        <TouchableOpacity onPress = {()=> this.kakaoSignIn()}>
                            <Image source = {require('../../../src/assets/kakao_login_medium_wide.png')} style ={{}}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{marginTop : 16}}>
                        <TouchableOpacity 
                        // onPress = {() =>this.getProfile()}
                        >
                            <Image style ={{}} source = {require('../../../src/assets/naver_loginBtn.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{marginTop : 16}}>
                        <TouchableOpacity 
                        // onPress = {() =>this.getProfile()}
                        >
                            <Image style ={{}} source = {require('../../../src/assets/google_loginBtn.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default Loading;