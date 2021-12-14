import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import Modal from "react-native-modal";
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import InviteListItems from './invitelistitem';
import InviteModal from './invitemodal';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { connect, useSelector } from 'react-redux';

const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height

class InviteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            // popUpRef: React.createRef(),
            isModalVisible: false
        };
    }

    componentDidMount(){
        this.getModaldataItem()


    }


    getModaldataItem = () =>{
        const {data} = this.state
        const newArray = data.map(e=>{
            return {
                ...e,
                isSelected : false,
            }
        })
        this.setState({
            data : newArray
        })
    }
   

    renderInvite = ({item}) => {
        return (
            <InviteListItems
                source={item.source}
                nickname={item.nickname}
                id={item.freinds_id}/>
        );
    };
    invitelist = invites => {
        return invites.map(invite => {
            return Object.assign(invite, {key: invite.key});
        });
    };

    show = () => {
        this.setState({isModalVisible: true})

    }
    
    close = (dataSelctture) => {

        this.setState({isModalVisible: false})
        
        this.setState({
            data : dataSelctture
        })
    }
    closeOutside = () => {

        this.setState({isModalVisible: false})
       
    }

    render() {
        const {isModalVisible} = this.state
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems :'center',
                        paddingHorizontal :20
                        
                        
                    }}>
                    <View style ={{flexDirection :'row'}}>
                        <Text style={styles.textname}>초대된 친구목록</Text>
                        <View style ={{alignItems :'center',backgroundColor : '#000', width :36, height :22, borderRadius:6 ,marginLeft :5 ,paddingBottom :5 ,bottom : 2}}>
                            <Text style={{color:'white' , top :3.5 ,fontSize :12, fontWeight :'400'}}>{this.props.invite.length}/8</Text>
                        </View>
                    </View>    
                    <TouchableWithoutFeedback onPress={this.show}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems : 'center',
                            }}>
                            <Text style={styles.invitefriendlist}>초대</Text>
                            <IonIcon name="add-outline" size={20} color = '#5585E8'/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <FlatList
                    data={this.props.invite}
                    renderItem={this.renderInvite}
                    numColumns={4}
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: '#fff'
                    }}/>
                <Modal
                    style={styles.modal}
                    transparent={true}
                    isVisible={this.state.isModalVisible}
                    onRequestClose={this.close}
                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    onBackdropPress={this.closeOutside}
                    useNativeDriver={false}
                    // backdropColor='#000000AA'
                    backdropOpacity={0.4}
                    animationInTiming={400}
                    >
                        <InviteModal
                            isModalVisible = {isModalVisible}
                            title="asssdsdds"
                            close = {this.close}
                            onTouchOutside={this.closeOutside}
                            data={this.state.data}
                            />
                    </Modal>
                
            </View>

            );
    }
}

const styles = StyleSheet.create({
    modal: {

        margin: 0, // This is the important style you need to set
        alignItems: 'center',
        justifyContent: 'flex-end',
        width : WIDTH,
        height : 568,
      },
    invitefriendlist: {
        
        fontSize: 16,
        color: '#5585E8',
        fontWeight: '400'
    },
    textname: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400'
    }
});

function mapStateToProps(state){
    return{
        invite : state.invite
    }
}

export default connect(mapStateToProps)(InviteList);
