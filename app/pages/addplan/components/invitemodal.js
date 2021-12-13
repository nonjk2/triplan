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
import InviteFriendsItems from './inviteModalItem';
import SearchInput from '../../../../util/forms/input';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { connect, useDispatch } from 'react-redux';
import { inviteInsert, inviteDelete } from '../../../store/actions/invite_action';
import { bindActionCreators } from 'redux';


const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
class InviteModal extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isModalVisible: this.props,
                data : this.props.data,
                search : '',
                filterdata : this.props.data,
            };
        }
        
        componentDidMount(){
            
        }

        checkboxtruefalse = () =>{
            const modalchecked = this.props.invite
            const {data} = this.state
            for (let i = 0; i < modalchecked.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if(modalchecked[i].freinds_id == data[j].freinds_id){

                            const dataSelctture = data[j].isSelected 
                            const dataSelctturetwo = modalchecked[i].isSelected
                            this.setState({
                                dataSelctture : dataSelctturetwo
                            })
                        }
                    }
            }

        }
        //검색창 입니다 ///
        searchFirends = (text) =>{
            const {data} = this.state
            if(text){
                const newData = data.filter((item) =>{
                    const itemData = item.nickname ? 
                                            item.nickname.toUpperCase() 
                                            : ''.toUpperCase();
                    const TextData = text.toUpperCase();
                    return itemData.indexOf(TextData) > -1;
                })
                this.setState({
                    filterdata : newData
                })
                this.setState({
                    search : text
                })
            }else{
                this.setState({
                    filterdata : data
                })
                this.setState({
                    search : text
                })

            }
        }


        renderOutsideTouchable(onTouch) {
            
            const view = <View onAnimationType='fade' style={{flex: 1,width: '100%'}}/>
                if (!onTouch) 
                    return view
                return (
                    <TouchableWithoutFeedback
                        onPress={onTouch}
                        style={{flex: 1,width: '100%'}}>
                        {view}
                    </TouchableWithoutFeedback>
                )
            }

        renderTitle = () => {
            const {title} = this.props
            return (
                <View style={styles.modalTitle}>
                    <View style={styles.modalTitleinside}>
                        <IonIcon name="search" size={20} style={styles.modalIconLeft}/>
                        <View style={{flex: 1}}>
                            <SearchInput
                                value={this.state.search}
                                onChangeText={(text) => this.searchFirends(text)}
                                placeholder="친구이름#아이디번호"
                                backgroundColor='#000'
                                placeholderTextColor='#fff'
                                color='#fff'
                                borderRadius={5}
                                style={{}}/>
                        </View>
                        <Text style={styles.modalIconRight}>+{this.state.data.filter(e => e.isSelected ==true).length}</Text>
                    </View>
                </View>

            )
        }
        


        checked = (item,index) =>{
            const {data} = this.state
            const newData = data.map(e=>{
                if(e.nickname == item.nickname){
                    return {
                        ...e,
                        isSelected : !e.isSelected,

                    }}
                return {
                    ...e,
                    isSelected : e.isSelected
                }})

                
            this.setState({
                data : newData
            })

        }
            

        renderInviteModal = ({item , index}) => {
                
            return (
                <View style={{flexDirection : 'row',alignItems : 'center' }}>
                    <InviteFriendsItems
                        index={index}
                        item={item}
                        source={item.image_id}
                        nickname={item.nickname}
                        isSelected= {item.isSelected}
                        id={item.freinds_id}
                        introduce = {item.introduce}
                        />
                        
                     <CheckBox
                        style={styles.checkbox}
                        value={item.isSelected}
                        onValueChange={() => this.checked(item,index)}
                        animationDuration={0.2}
                        lineWidth={2}
                        onCheckColor='#fff'
                        onTintColor='#5585E8'
                        onFillColor='#5585E8'
                        offAnimationType='fill'
                        onAnimationType='fill'
                        tintColor='#5585E8'/>   
                </View>
            );
        };

        onClickInvite = () =>{
            const {data} = this.state
            const {close} = this.props
            const listSelected =data.filter(e => e.isSelected == true);
            this.props.inviteDelete()
            for (let key in listSelected) {
                this.props.inviteInsert(listSelected[key])    
            }
            close(data)
        }

        renderContent = (item ,index) => {

            return (
                <View style = {{marginTop : 10,}}>
                    <FlatList
                        data={this.state.filterdata}
                        renderItem={this.renderInviteModal}
                        showsVerticalScrollIndicator={true}
                        keyExtractor={item => `key-${item.freinds_id}`}
                        style={{
                            width : '100%',
                            height : 510,
                            paddingHorizontal : 16,
                            backgroundColor: '#fff'
                        }}/>
                    <View style={styles.wrapButton}>
                        <TouchableOpacity style={{alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : this.state.data.filter(e => e.isSelected ==true).length === 0 ? '#767676DD' : '#5585E8DD',
                                width : WIDTH-32,
                                height : 50,
                                borderRadius : 10,
                                }} onPress = {this.onClickInvite}>
                            <Text style = {styles.compleatText}>완료</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            )
        }

        render() {
            const {data} = this.state
            let {show} = this.state
            const {onTouchOutside} = this.props
            return (
                    <View style = {{

                        width: WIDTH,
                        height: 568,
                        borderRadius: 10,
                    }}>
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={styles.modalView}>
                            <View style = {{alignItems :'center',height : 30,}}>
                                <IonIcon name="remove-sharp" size={30} style={{color: '#000'}}/>
                            </View>    
                            {this.renderTitle()}
                            {this.renderContent()}
                        </View>
                    </View>
            );
        }
    }

    const styles = StyleSheet.create({
        wrapButton:{
            position : 'absolute',
            alignItems : 'center',
            justifyContent : 'center',
            top : 378,
            left : 16,


        },
        compleatButton : {
            

        },
        compleatText : {
            fontWeight : '400',
            color : '#fff',
            fontSize : 14,
        },
        modalView : {
            backgroundColor: '#fff',
            width: '100%',
            borderTopEndRadius: 10,
            borderTopLeftRadius: 10,
            // paddingHorizontal: 5,
            maxHeight: HEIGHT_MODAL
        },
        modalTitle : {

            paddingVertical: 2,
            paddingHorizontal: 16,
        },
        modalTitleinside : {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000',
            borderWidth: 3,
            borderRadius: 5
        },
        modalIconLeft : {
            flexWrap: 'wrap',
            zIndex: 999,
            color: '#fff',
            paddingLeft: 12,
        },
        modalIconRight : {
            flexWrap: 'wrap',
            paddingRight: 7,
            color: '#fff',
            fontSize : 14,
            fontWeight : '400'
        },
        checkbox: {
            height : 24,
            width : 24,

        },
        searchIcon: {
            flex: 1
        },
        inviteModal: {
            flex: 1,
            justifyContent: 'flex-end',
            width : WIDTH,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
    function mapStateToProps(state){
        return{
            invite : state.invite
        }
    }
    function mapDispatchToProps(dispatch){
        return bindActionCreators({inviteInsert,inviteDelete},dispatch);
    }

    export default connect(mapStateToProps,mapDispatchToProps)(InviteModal);
