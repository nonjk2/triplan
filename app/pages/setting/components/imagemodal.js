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
import IonIcon from 'react-native-vector-icons/Ionicons';
import { connect, useDispatch } from 'react-redux';
import { inviteInsert, inviteDelete } from '../../../store/actions/invite_action';
import { bindActionCreators } from 'redux';
import ImagePicker from 'react-native-image-crop-picker';




const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = Dimensions.get("window").height
class Imagemodal extends React.Component {
        constructor(props) {
            super(props);
            this.state = {

                
            };
        }
        
        componentDidMount(){
            
        }
        takePhotos = () => {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log(image);
                this.props.cameraselect(image.path)
              });
              this.props.close();
          };

        choosePhotoFromGelrary = () => {
            ImagePicker.openPicker({
                width: 80,
                cropperChooseText : '선택',
                cropperCancelText : '취소',
                cropperCircleOverlay : true,
                cropperToolbarTitle : '프로필사진을 골라주세요',
                height: 80,
                cropping: true
              }).then(image => {
                this.props.cameraselect(image.path)
                console.log(image);
              });
        }


        defaultimgsetting = () => {
            this.props.defaultimgset();
            this.props.close();
        }
        render() {
            return (
                    <View style = {{width: 343,height: 295, borderRadius :10, backgroundColor : '#fff' , shadowOffset:{ width :2, height : 4,} , shadowOpacity : 0.10 , shadowColor : '#000'}}>
                        <View style = {{width : 343 , height : 40 ,backgroundColor : '#5585E8'  , borderTopRightRadius: 10,borderTopLeftRadius : 10, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = {{ color : '#fff' , fontSize : 15, fontWeight : '500'}}>이미지 가져오기</Text>
                        </View>
                        <View style = {{ flex : 7, backgroundColor : '#fff' , borderBottomColor : '#C4C4C4' ,borderBottomWidth : 1,}}>
                            <TouchableOpacity style = {{flex : 1 , alignItems : 'center', justifyContent : 'center' , flexDirection : 'row'}} onPress = {this.takePhotos}>
                                <IonIcon name="camera-outline" size={20} style ={{ paddingRight : 8}}/>
                                <Text>사진 촬영</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{ flex : 7, backgroundColor : '#fff' , borderBottomColor : '#C4C4C4', borderBottomWidth : 1,}}>
                            <TouchableOpacity style = {{flex : 1 , alignItems : 'center', justifyContent : 'center',flexDirection : 'row'}} onPress = {this.choosePhotoFromGelrary}>
                                <IonIcon name="image-outline" size={20} style ={{ paddingRight : 8}}/>
                                <Text>앨범에서 가져오기</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{ flex : 7, backgroundColor : '#fff' , borderBottomColor : '#C4C4C4', borderBottomWidth : 1,}}>
                            <TouchableOpacity style = {{flex : 1 , alignItems : 'center', justifyContent : 'center',flexDirection : 'row'}} onPress = {this.defaultimgsetting}>
                                <IonIcon name="sync-outline" size={20} style ={{ paddingRight : 8}}/>
                                <Text>기본이미지로 변경</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{ flex : 4, backgroundColor : '#fff' , borderBottomLeftRadius : 10, borderBottomRightRadius :10,}}>
                            <TouchableOpacity style = {{flex : 1 , alignItems : 'center', justifyContent : 'center',flexDirection : 'row'}} onPress ={this.props.close}>
                                <Text style = {{ fontSize : 14 , color : 'red'}}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            );
        }
    }

    const styles = StyleSheet.create({
        
    });
    function mapStateToProps(state){
        return{
            invite : state.invite
        }
    }
    function mapDispatchToProps(dispatch){
        return bindActionCreators({inviteInsert,inviteDelete},dispatch);
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Imagemodal);
