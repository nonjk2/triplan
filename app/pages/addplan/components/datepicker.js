import React, {Component} from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View ,Text, TouchableOpacity} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dateInsert } from '../../../store/actions/date_insert';


LocaleConfig.locales['fr'] = {
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일','월','화','수','목','금','토',],
    today: 'Aujourd\'hui'
  };

LocaleConfig.defaultLocale = 'fr';

const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height

class Calendars extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    selectday : [],
                    marked : [],
                    a :{}
                };
            }

            // 날짜와 날짜 사이값 채워넣기 //
            getDatesStartToLast(lastday,firstday) {
                

                var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
                if(!(regex.test(this.state.selectday[0]) && regex.test(this.state.selectday[1]))) return "Not Date Format";
                var result = [];
                var curDate = new Date(this.state.selectday[0]);
                while(curDate <= new Date(this.state.selectday[1])) {
                    result.push(curDate.toISOString().split("T")[0]);
                    curDate.setDate(curDate.getDate() + 1);
                }
                    const date2 =result.slice(1,result.length-1).map((e) => Object.assign({
                    [e] : {
                        selected: true,
                        color : '#5585E8',
                        textColor : 'white',
                        marked : true,
                    },
                    
                    
                }));

                const twodaymarked = []
                

                this.setState({
                    marked: twodaymarked.concat(firstday,date2,lastday)
                });
                console.log(twodaymarked.concat(firstday,date2,lastday))
            }
            // 날짜 초기화  함수 //
            refresh = () => {
                this.setState({
                    marked : [],
                    selectday : [],
                    a : {}
                })
            }
            // 날짜 선택 완료 //
            complete = () => {
                if(this.state.selectday.length === 0){
                    alert('~날짜를 선택해주세요~')
                }else{
                    this.props.dateInsert(this.state.selectday)
                    this.props.close(this.state.selectday)
                }
            }


            // 날짜 선택하는 함수 //
            daypicked = (day) =>{

                if(this.state.selectday.length===0){
                    this.setState({
                        selectday : [day]
                    },
                    () => {
                        let obj = this.state.selectday.reduce((c, v) => Object.assign(c, {
                            [v]: {
                                // startingDay: true,{}
                                marked : true,
                                selected : true,
                                color: '#5585E8',
                                textColor : 'white'
                            }
                        }), {});
                        this.setState({marked: this.state.marked.concat(obj)});
                    })
                }else if(this.state.selectday.length===1){
                    if(this.state.selectday[0] === day){
                        alert('서로다른 날짜를 클릭해주세요')
                    }else{
                    this.setState({
                        selectday: this.state.selectday.concat(day),
                    }, () => {
                        let obj = {
                            [day] : {
                                selected: true,
                                endingDay: true,
                                color : '#5585E8',
                                textColor : 'white',
                                marked : true,
                            },
                        };
                        let obj2 = this.state.selectday.reduce( e => Object.assign({
                            [e] : {
                                marked : true,
                                startingDay: true,
                                color: '#5585E8',
                                textColor : 'white'
                            }
                        }))
                        console.log(obj2)
                        this.getDatesStartToLast(obj,obj2);
                    })}
                }else{
                    alert('날짜를 리셋하려면 새로고침버튼을 눌러주세요')
                }
            }

            render(){
                this.state.marked.forEach(e => Object.assign(this.state.a,e))
                const day = this.state.marked.length
              return(
                <View style={{ backgroundColor : 'white' , width : 343, height : 532 , borderRadius : 15,}}>
                    <View style = {{width : 343 , height : 80 ,backgroundColor : '#5585E8'  , borderRadius : 15 , alignItems : 'center'}}>
                        <Text style = {{color : 'white' , paddingHorizontal : 16,paddingTop : 16, fontWeight : '500' , fontSize : 18,}}>여행 기간 및 날짜 선택</Text>
                        <View style = {{paddingHorizontal : 16,paddingTop : 8 ,flexDirection : 'row' ,alignContent :'center'}}>
                            <View style = {{flex : 4 ,alignItems : 'flex-end'}}>
                                <Text style = {{color : 'white' , fontWeight : '400' , fontSize : 16,}}>{this.state.selectday[0]}</Text>
                            </View>
                            <View style = {{flex : 1 ,alignItems : 'center'}}>
                                <Text style = {{color : 'white' , fontWeight : '400' , fontSize : 16,}}>~</Text>
                            </View>
                            <View style = {{flex : 4 ,justifyContent: 'space-between',flexDirection : 'row' }}>
                                <Text style = {{color : 'white' , fontWeight : '400' , fontSize : 16,}}>{this.state.selectday.length===1 ? this.state.selectday[0] : this.state.selectday[1]}</Text>
                                <TouchableOpacity style={{ bottom : 5, }} onPress = {() => {this.refresh()}}>
                                    <IonIcon name="sync-outline" size={25} style={{color : 'white' , fontWeight : '400'}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style = {{ width : 343,height : 370 }}>
                        <Calendar
                            markingType={'period'}
                            onDayPress={(day) => {this.daypicked(day.year + "-" + day.dateString.split('-')[1] + "-" + day.dateString.split('-')[2])}}
                            markedDates={this.state.a}
                            renderArrow={(direction) => direction === "left" ? (
                                <IonIcon name="chevron-back-outline" size ={20} color ='#5585E8' />

                            ) : (
                                <IonIcon name="chevron-forward-outline" size ={20} color ='#5585E8'/>
                            )

                            }
                            renderHeader={(date) => { return(
                                <View style = {{alignItems : 'center'}}>
                                    <Text style = {{ color : '#5585E8' , fontSize : 18, fontWeight : '700'}}>{date.getFullYear()}, {date.getMonth()+1}월</Text>  
                                </View>)}}
                            theme={{
                                'stylesheet.calendar.header': {
                                dayTextAtIndex0: {
                                    color: 'red'
                                },
                                dayTextAtIndex6: {
                                    color: 'blue'
                                }
                                },
                                textDayHeaderFontWeight: '300',
                                arrowStyle : {
                                    justifyContent : 'space-evenly'
                                }
                                
                            }}
                        />
                    </View>
                    <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                            
                            <TouchableOpacity onPress ={this.props.close} style = {{backgroundColor : '#000',alignItems : 'center', justifyContent : 'center' ,borderRadius : 15 , flex : 1, padding : 15 ,marginHorizontal : 15,}}>
                                <Text style = {{color : '#fff'}}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this.complete} style = {{ backgroundColor : '#5585E8' ,alignItems : 'center', justifyContent : 'center' , borderRadius : 15, flex : 1, padding : 15,marginHorizontal : 15,}}>
                                <Text style = {{color : '#fff'}}>완료</Text>
                            </TouchableOpacity>
                    </View>
                </View>
              )
            }
}

const styles = StyleSheet.create({
    inviteModal: {
      flex: 1,
      justifyContent: 'flex-end',
      height: 532,
      width: 342,
      backgroundColor: '#000000AA',
      borderTopStartRadius: 10,
      borderTopEndRadius: 10
  },
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({dateInsert},dispatch);
}
export default connect(null ,mapDispatchToProps)(Calendars);


