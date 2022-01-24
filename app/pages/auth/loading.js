import axios from 'axios';
import React, {Component} from 'react';
import { Animated , View , Image, Dimensions, TouchableOpacity, Linking, Alert } from 'react-native';
import kakaoLogin, { getAccessToken, login, logout } from '@react-native-seoul/kakao-login';
import { connect, useDispatch } from 'react-redux';
import { signIn,signUp,autoSignIn } from '../../store/actions/user_action';
import { bindActionCreators } from 'redux';
import { setToken , getToken} from '../../../util/misc';

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

            Signin : true,

        }
    }

//////// auth 설정 /////////
///////////////자동로그인/////////////////////////
    // componentDidMount(){
    //     getToken((value) =>{
    //         if (value[1][1]===null) {
    //             console.log("1단계 실패")
    //             this.setState({
    //                 Signin : false
    //             })
    //             Alert.alert("다시로그인을해주세요!")
    //         }else{
    //             this.props.autoSignIn(value[2][1]).then(()=>{
    //                 if (!this.props.user.auth.token) {
    //                     Alert.alert("다시로그인을해주세요!")
    //                     this.setState({Signin : false})    
    //                 }else{
    //                     console.log("3단계성공")
    //                     setToken(this.props.user.auth, ()=> {
    //                         this.props.navigation.navigate("Firstopen")
    //                     })
    //                 }
    //             })
    //         }
    //         console.log("getToken:",value)
    //     })
    // }
///////////////자동로그인/////////////////////////
    onComplete = () =>{
        const Signin = this.state.Signin
        if (Signin == true) {
            this.props.navigation.navigate("Firstopen")    
        }else{
            this.props.navigation.navigate("Loading")

        }
    }

    manageAcceess = () => {
        if (!this.props.user.auth.email) {
            Alert.alert("실패")
        }else{
            console.log("asdfasdfasdf")
            setToken(this.props.user.auth, ()=>{
                this.props.navigation.navigate("Firstopen")    
            })
        }
    }
    // 카카오 로그인 ///
    kakaoSignIn = () => {
        login()
        .then((result)=> {
            console.log(result)
            // this.logined(result.accessToken).then(()=> this.manageAcceess())
        })
        .catch(err => {
            Alert.alert("login 실패"+err)
        })
    }
    /// 구글 로그인 ///
    /// 네이버 로그인 ///

    ///서버 토큰 전달 ///
     logined = async (token) => {
        try {
            await axios.post(`http://211.250.116.177:9090/social/login/kakao`,{
            accessToken : token,
                },      
            )
            .then((response)=>this.props.signIn(response.data.data))
            // .then((response)=>console.log(response.data));        
            .catch(err =>Alert.alert("회원가입 및 로그인 실패 : " + err));
        } 
        catch (error) {
                console.log(error)
            }
        }
    
    
      kakaoLogout() {
        console.log('   kakaoLogout   ');
        logout((err, result) => {
          if (err) {
            console.log("ㅁㅁㅁㅁㅁㅁ",err.toString());
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
                        // onPress = {() => this.props.navigation.navigate("Firstopen")}
                        >
                            <Image style ={{}} source = {require('../../../src/assets/naver_loginBtn.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{marginTop : 16}}>
                        <TouchableOpacity 
                        
                        onPress = {() =>this.onComplete()}
                        >
                            <Image style ={{}} source = {require('../../../src/assets/google_loginBtn.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
function mapStateToProps(state){
    return{
        user : state.user
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({signIn,signUp,autoSignIn},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);
