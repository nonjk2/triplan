import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Image,
    Dimensions
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import { HiddenItemWithAction } from '../plantap/components/scheduleSwipe';
import { useDispatch, useSelector } from "react-redux";
import { DummyDATA } from '../../../util/forms/data';
import InviteModal from '../addplan/components/invitemodal'
import Modal from "react-native-modal";
import IonIcon from 'react-native-vector-icons/Ionicons';


const WIDTH = Dimensions.get("window").width
const DATA = DummyDATA
export default function Invitetap(props) {
    const invite = useSelector(state =>state.invite)
    const [isinvitevisible,setisinvitevisible]=useState(false)
    useEffect(()=>
      console.log(listData),
    )
    const {startDate,navigation} = props
    const [listData] = useState(
      // invite
      DATA
      .map((_, i) => ({...DATA[i],key: `${i}`}))
    );
    const openRowRef = useRef(null);
    const onRowDidOpen = (rowKey, rowMap) => {
        openRowRef.current = rowMap[rowKey];
    };
    
    const closeOpenRow = () => {
        if (openRowRef.current && openRowRef.current.closeRow) {
            openRowRef.current.closeRow();
        }
    };

    const renderHiddenItem = (data,rowMap) => (
        <HiddenItemWithAction
        data={data}
        rowMap={rowMap}
        onClose={()=>this.closeRow(rowMap, data.item.schedule_id)}
        onDelete = {()=> deleterow(rowMap, data.schedule_id )}
        // onLeftAction = {()=>this.onLeftAction(rowMap)}
        // leftActionActivated

      />
    );
    const closeModal = () => {
        setisinvitevisible(false)
    }
    
    const renderInviteFriends = ({item , index}) => {
      return (
          <View style ={{
            
              backgroundColor :'#fff' ,
              marginVertical : 5,
              marginLeft : 20,
              borderRadius : 10, 
              height : 100,
              width: 343,
              alignItems : 'center',
              justifyContent : 'center',
              shadowOffset : {
                width: 0,
                height : 1,
                
              },
              shadowRadius: 5,
              shadowColor : '#000000',
              shadowOpacity : 0.10,
              }}>
              <View style={{flexDirection : 'row',alignItems : 'center' ,width : '95%', height : 75}}>
                  <View style={styles.invitebutton}>
                        <IonIcon name="bookmark" size={24} style={{position:'absolute' ,right : 5,top : 5}}/>

                      <Image
                          source={{uri : item.source}}
                          style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 15,
                                  flexWrap: 'wrap',
                                  borderColor : '#5585E8',
                              }}/>
                      <View style={styles.invitecontain}>
                          <View style={styles.inviteView}>
                              <Text style={styles.friendsnamestyle}>{item.nickname}#{item.friends_id}</Text>
                              <Text style={styles.friendsIntro}>{item.introduce}</Text>
                          </View>
                      </View>
                  </View>   
              </View>
          </View>
      );
  };

    return (
        <View style={styles.container}>
            
            <SwipeListView
                style = {{marginTop : 48}}
                data={listData}
                renderItem={renderInviteFriends}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-80}
                previewRowKey={'0'}
                // previewOpenValue={-40}
                // previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            <TouchableOpacity
            onPress={() => {
                setisinvitevisible(true)
            }}
            style={{
                width: 60,
                height: 60,
                position: 'absolute',
                bottom: 118,
                right: 20,
            }}>
            <View>
                <Image source={require('../../../src/assets/Button.jpg')} />
            </View>
            </TouchableOpacity>
            <Modal
                    style={styles.modal}
                    transparent={true}
                    isVisible={isinvitevisible}
                    onRequestClose={closeModal}
                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    onBackdropPress={closeModal}
                    useNativeDriver={false}
                    // backdropColor='#000000AA'
                    backdropOpacity={0.4}
                    animationInTiming={400}
                    >
                    <InviteModal
                        isModalVisible = {isinvitevisible}
                        title="asssdsdds"
                        close = {closeModal}
                        onTouchOutside={closeModal}
                        data={DATA}
                        />
                </Modal>
            {/* <TouchableOpacity onPress={closeOpenRow} style={styles.closeButton}>
                <Text>Close Open Row</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
      invitecontain: {
        flex: 2,
        marginLeft: 10,
        justifyContent: 'center'
    },
    container: {

        backgroundColor: '#fff',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    closeButton: {
        backgroundColor: 'white',
        bottom: 30,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
        padding: 15,
        position: 'absolute',
        right: 30,
    },
    friendsnamestyle: {
    
      color: "#000",
      fontSize: 15,
      padding: 2,
      fontWeight: '500'
    },
    friendsIntro: {
        padding: 2,
        fontSize: 14,
        color: '#767676'

    },
    inviteView: {
        justifyContent: 'center'
    },
    plantextView: {
        textAlignVertical: 'center',
        flex: 3
    },
    invitebutton: {
      flexDirection: 'row',
      flex : 1,
      alignItems : 'center',
      marginVertical: 5
    },
    modal: {

        margin: 0, // This is the important style you need to set
        alignItems: 'center',
        justifyContent: 'flex-end',
        width : WIDTH,
        height : 568,
  },
});