import React, {Component, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import NaverMapView, { Align, Marker, Path, Polyline } from '../../map';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { MYAPI_KEY } from '../../../../util/forms/data';


const P0 = {latitude: 37.59229660205149,longitude: 126.97558048678314, index: 0}; const P1 = {latitude: 37.821181701506276,longitude: 127.54229189686288,index: 1};
const P2 = {latitude: 37.67639982426067,longitude: 127.86638861746769, index: 2}; const P4 = {latitude: 37.368526562915974,longitude: 127.92040466073564, index: 3};
const P5 = {latitude: 37.255661731852015,longitude: 127.665888045982, index: 5};


const getDateDiff = (date1, date2) => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    year: diff.getUTCFullYear() - 1970,
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds()
  };
};
const formatDate = (date) => {
  let d = new Date(date),
    month = (d.getMonth() + 1).toString(),
    day = d.getDate().toString(),
    year = d.getFullYear().toString();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};


function PlanListItems(props) {
    const futureDate = new Date(props.startDatetime);
    const [toggleon,settoggleon]=useState(false)
    const { state, navigation } = props;
    const mapView=useRef()
    const [currentLocation, setCurrentLocation] = useState(P0);

    const [diff, setDiff] = useState({});
    useEffect(() => {
        const timer = setInterval(() => {
        setDiff(getDateDiff(new Date(), futureDate));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    

    // const getDDay = (type) => {
    //     // D-Day 날짜 지정
    //     const setDate = new Date(props.startDatetime);
    //     // D-day 날짜의 연,월,일 구하기
    //     const setDateYear = setDate.getFullYear();
    //     // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
    //     const setDateMonth = setDate.getMonth() + 1;
    //     const setDateDay = setDate.getDate();
      
    //     // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
    //     const now = new Date();
      
    //     // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
    //     const distance = setDate.getTime() - now.getTime();
        
    //     // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
    //     // 밀리초 값이기 때문에 1000을 곱한다. 
    //     // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
    //     // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
    //     const day = Math.floor(distance/(1000*60*60*24));
    //     const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    //     const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    //     const seconds = Math.floor((distance % (1000*60))/1000);
      
    //     // D-Day 날짜를 가져오고,
    //     // 삼항 연산자를 사용해서 값이 10보다 작을 경우에 대해 조건부 렌더링을 해준다.
    //     if (type==="on") {
    //         return( 
         
    //             `D- ${day}일 `)    
    //     }else if(type==="off"){
    //         return( 
    //             `${setDateYear}년 ${setDateMonth}월 ${setDateDay}일까지 
    //             ${day}일 ${hours < 10 ? `0${hours}` : hours}시간 ${minutes < 10 ? `0${minutes}` : minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초 
    //              남았습니다.`)
    //     }
        
    //     }
      
      
    //   const init = (type) => {
    //     // init 함수 생성해서 getDDay함수 호출하고,
    //     getDDay(type);
    //     // setInterval 메서드에서 getDDay함수를 1초(1000밀리초)마다 호출한다.
    //     setInterval(getDDay, 1000);
    //   }
      






    const planday = () =>{
      const start = new Date(props.startDatetime)
      const end = new Date(props.endDatetime)
      const startday = new Date(start.getFullYear(),start.getMonth()+1,start.getDate())
      const endday = new Date(end.getFullYear(),end.getMonth()+1,end.getDate())

      const btMs = endday.getTime() - startday.getTime()
      const btDay = btMs / (1000*60*60*24);
      return (btDay+1);
    }

    function Dday(props) {
        
        let bagroundColor = ''
        let Ddayy =''
        let bagroundWidth = ''
        if(props.tpye === '완료'){
            bagroundColor = '#000'
            Ddayy = ''
            bagroundWidth = 45
        }else if(props.tpye === '진행중'){
            bagroundColor = 'red'   
            bagroundWidth = 55
        }else{
            bagroundColor = '#5585E8'
            Ddayy = 'D-'
            bagroundWidth = 50
        }

        return (
            
            <View style = {
                
                toggleon ? {
                    height : 25,
                    width : 60,
                    backgroundColor : bagroundColor,
                    position : 'absolute',
                    marginBottom : 10,
                    borderRadius : 10,  
                    justifyContent : 'center',    
                }:{
                height : 25,
                width : '100%',
                backgroundColor : bagroundColor,
                // flex : 1,
                marginBottom : 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius : 10,  
                justifyContent : 'center',

            }}>{toggleon ? 
                <Text style = {{
                    color : 'white',
                    fontSize : 12,
                    textAlign : 'center',
                    fontWeight : '700',
                    justifyContent : 'center',
                }}>ㅁ</Text>
                :
                <Text style = {{
                    color : 'white',
                    fontSize : 10,
                    textAlign : 'right',
                    fontWeight : '700',
                    justifyContent : 'center',
                }}>
                {`${formatDate(futureDate)} 까지
                ${diff.month} 월 ${diff.day} 일 ${diff.hour} 시 ${diff.minute} 분 ${diff.second} `}초
                </Text>}
            </View>
        );
    }

    return (
        <View style = {{marginBottom : 8,
            marginLeft : 5,}}>
        <TouchableOpacity 
        disabled={toggleon ? true : false}
        style ={{
            backgroundColor : toggleon ? '#f5f5f5': null
        }}
        
        onPress = {()=> settoggleon(!toggleon)}
        >
            <Animatable.View 
            style ={[styles.listbutton ,toggleon && styles.listbuttonOn ]}
            transition={['height']}
            disabled={true}
            >
            {toggleon ? 
                
            // <View style = {{backgroundColor : '#000' , zIndex : 100 ,position : 'absolute' ,width : '100%',height : '83%',top : 50 , borderRadius : 10}}>
                <NaverMapView 
                    ref={mapView}
                    style={{position : 'absolute',width: '100%', height: '100%' ,borderRadius : 30 , flex : 1,top : 0}}
                    showsMyLocationButton={false}
                    scrollGesturesEnabled={false}
                    scaleBar={false}
                    zoomGesturesEnabled={false}
                    stopGesturesEnabled={true}
                    zoomControl={false}
                    center={{...currentLocation, zoom: 8,tilt : 5 , bearing : 5}}
                    buildingHeight={10}
                    nightMode={false}
                    mapType={0}
                    useTextureView
                     >
                        {/* {searchdata.name ?  */}
                        <Marker
                            coordinate={P0}
                            caption={{
                                text : '출발',
                            }}
                            width ={30}
                            height = {50}
                            onClick= {()=>
                                mapView.current.animateToTwoCoordinates(P0,P1)
                            }
                            zIndex={1000}
                            isHideCollidedCaptions={false} 
                            animated={true}
                            
                        />
                        <Path
                            coordinates={[P0,P1]}
                            width = {5}
                            color = {'#5585E8'}
                            outlineWidth = {.5}
                            passedColor ={'green'}
                            outlineColor = {'red'}
                            passedOutlineColor = {'#c4c4c4'}
                            progress ={0}
                            zIndex = {999}
                        />
                        <Marker
                            coordinate={P1}
                            caption={{
                                text : '도착'
                            }}
                            width ={30}
                            height = {50}
                            onClick= {()=>mapView.current.animateToTwoCoordinates(P0,P1)}
                            zIndex={1000} 
                            animated={true}
                        />


                            {/* :
                            null
                            } */}
                        
                </NaverMapView>
                
            // </View> :
            : 
            <Image source = {{uri :`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${props.source}&key=${MYAPI_KEY}`}} style = {styles.planlistimage}/>
            }
            <Animatable.View 
                style = {[styles.plancontain , toggleon && styles.plancontainOn]}   
            >
                <Dday tpye = {props.dday}/>
                <Animatable.View transition = {['borderWidth','height','width']} style = {[styles.plantextView ,toggleon && styles.plantextViewOn]}>
                    <Text style = {[styles.plannamestyle,toggleon && styles.plannamestyleOn]}>{props.title}</Text>
                    <Text style = {{
                        padding : 2,
                        fontSize : 14,
                        fontWeight : '400',

                        color : props.dday === '진행중' ? 'red' : props.dday < 40 ? '#5585E8' : '#000',
                        
                        }}> {new Date(props.startDatetime).getMonth()+1+"월"}{new Date(props.startDatetime).getDate()+"일"}~
                            {new Date(props.endDatetime).getMonth()+1+"월"}{new Date(props.endDatetime).getDate()+"일"}</Text>
                </Animatable.View>
            </Animatable.View>
            {toggleon ? 
            <>
            <TouchableOpacity 
                // onPress={()=> mapView.current.animateToTwoCoordinates(P0,P1)}
                onPress = {()=>settoggleon(false)}
                style ={{backgroundColor : '#5585E8', width : 30 , height : 30, borderRadius : 15 , position : 'absolute' , right : 10 , alignItems : 'center' , justifyContent : 'center' , top : 10, shadowOpacity : .25, shadowOffset : {width : 0 , height : 5}}}>
                <IonIcon name={'chevron-down-outline'} size ={25} color ={'#fff'}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('plan',{
                        key : props.key,
                        planday : planday(),
                        startDate : props.startDatetime,
                        endDate : props.endDatetime,
                        name : props.title,
                        source : props.source,
                    });
                    }}
                style ={{backgroundColor : '#fff', width : 30 , height : 30, borderRadius : 15 , position : 'absolute' , right : 10 , alignItems : 'center' , justifyContent : 'center' , top : 50,shadowOpacity : .25, shadowOffset : {width : 0 , height : 5}}}>
                <IonIcon name={'ellipsis-horizontal'} size ={15} color ={'#000'}/>
            </TouchableOpacity>
            </>
            : null }

            
        </Animatable.View>
             

        </TouchableOpacity>
        </View>
        
    );
}




const styles = StyleSheet.create({
    listbutton : {
        flexDirection : 'row',
        height : 120,
        borderWidth : 0,
    },
    listbuttonOn : {
        overflow : 'hidden',
        flexDirection : 'row',
        flexWrap : 'wrap',
        height : 400,
        borderWidth : 2,
        borderColor : '#5585E8',
        borderRadius : 10,
    },
    planlistimage : {
        width : 197,
        height : 120,
        borderRadius : 10,
        flexWrap : 'wrap',
    },
    plancontainOn:{
        // justifyContent : 'center'
        // flexDirection : 'row',
        marginTop : 10,
        
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
    plannamestyleOn : {
        fontSize : 18,
        fontWeight : '400',
        padding : 2,
    },
    ddayTextView : {
        flex : 1,
        alignItems : 'flex-start',
        
    },
    plantextViewOn : {
        alignSelf : 'center',
        alignItems : 'center',
        // borderWidth :0,
        width : 150,
        height : 20,
    },
    plantextView : {
        // textAlignVertical : 'center',
        // flex : 3,
        // borderWidth :1,
        width : 150,
        height : 43

        
    }


});

export default PlanListItems;
