import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import jenny from '../../../../src/assets/jenny.jpg';
import Modal from "react-native-modal";
import Imagemodal from './imagemodal';


const WIDTH = Dimensions.get("window").width
const HEIGHT= Dimensions.get("window").height

const defaultImg = 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/11/bfbf9985-9838-4e27-9076-d4bfecbc88cc.jpg';

class Profile extends Component {

    state = {
        isModalVisible: false,
        myimage : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/11/bfbf9985-9838-4e27-9076-d4bfecbc88cc.jpg',
    }

    componentDidMount(){
        // this.props.navigation.setOption()
    }

    show = () => {
        this.setState({isModalVisible: true})
    }
    closeOutside = () => {
        this.setState({isModalVisible: false})
    }

    cameraselect = (Image) => {
        this.setState({
            myimage : Image
        })
        this.closeOutside();
    }
    defaultimgset = () => {
        this.setState({
            myimage : defaultImg
        })
    }

    
    render() {
        return (
            <View style={styles.container}>
                    <View
                        style={{
                            height : 100 ,
                            marginVertical : 13,
                            flexDirection: 'row',
                            alignItems : 'center',
                            
                        }}>
                            <View style ={{ flexDirection : 'row', marginVertical : 10, marginHorizontal : 16}}>
                            <Image
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                }}
                                source={{
                                    uri : this.state.myimage
                                }}/>
                            <View
                                style={{
                                    paddingHorizontal :20,
                                    justifyContent : 'center'
                                }}>
                                <View
                                    style={{
                                        flex: 1,

                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "500",
                                            color : '#5585E8'
                                        }}>트리플랜</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,


                                    }}>
                                    <Text
                                        style={{
                                            color : '#767676',
                                            fontSize: 16,
                                            fontWeight: "400",
                                        }}>여행성향 및 자기소개</Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        borderColor : '#000',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                    }}
                                    onPress={() => {this.show()}}
                                    >
                                    <Text style = {{ fontSize : 14, fontWeight : '400'}}>이미지 변경</Text>
                                </TouchableOpacity>
                            </View>
                                <Modal
                                style={styles.modal}
                                transparent={true}
                                isVisible={this.state.isModalVisible}
                                onRequestClose={this.closeOutside}
                                animationIn={'slideInUp'}
                                animationOut={'slideOutDown'}
                                onBackdropPress={this.closeOutside}
                                useNativeDriver={false}
                                backdropColor={'#fff'}
                                backdropOpacity={0.4}
                                animationInTiming={400}
                                >
                                    <Imagemodal
                                        close = {this.closeOutside}
                                        cameraselect = {this.cameraselect}
                                        defaultimgset = {this.defaultimgset}
                                    />
                                </Modal>
                            </View>

                    </View>

                <View style={{
                        flex: 2
                    }}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {

        margin: 0, // This is the important style you need to set
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    container: {

        height : 126,
        width : WIDTH,
        backgroundColor : '#F4F4F4',
        justifyContent : 'center',
        marginTop : 48,

    }
});

export default Profile;
