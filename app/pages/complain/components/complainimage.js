import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity,Image, FlatList} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
class ComplainImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image : []
        }
    }

    choosePhotoFromGelrary = () => {
        const imagedata = []
        ImagePicker.openPicker({
            width: 80,
            cropperChooseText : '선택',
            cropperCancelText : '취소',
            cropperToolbarTitle : '문의사진을 골라주세요',
            height: 80,
            cropping: true,
            multiple : true
          }).then(image => {
            console.log(image) //image 배열로 인덱스 0,1,2 나옴 밑에 map으로 돌려서 123 뽑아야됌 
            this.setState({
                image : imagedata.concat(image)
            })
            console.log(this.state.image)
          });
    }
    renderimage = ({item}) => {
        return (
            <TouchableOpacity style= {{ width : 80 , height : 80 ,marginRight : 10,}} disabled = {true}>
                <View style = {{ borderRadius : 15 , borderColor : '#C4C4C4', flex : 1 ,}} >
                    <Image source= {{uri : item.path}} style = {{flex : 1,}} />
                </View>
            </TouchableOpacity>
        );
    };

    plusorimage = () => {
        const imagedata = this.state.image
        if(imagedata.length === 0){
        return(
            <View style ={{ alignItems : 'center' }}>
                <TouchableOpacity style= {{ width : 80 , height : 80 , marginHorizontal : 4,}} onPress = {this.choosePhotoFromGelrary}>
                    <View style = {{borderWidth : 2, borderRadius : 15 , borderColor : '#C4C4C4', flex : 1 ,alignItems : 'center', justifyContent : 'center' }} >
                        <IonIcon name="add-outline"  size = {50}style = {{color : '#C4C4C4' }} />
                    </View>
                </TouchableOpacity>
            </View>

        )
        }else{
            return(
                    <View style ={{ alignItems : 'center' ,flexDirection : 'row'}}>
                        <FlatList
                        data={imagedata}
                        renderItem={this.renderimage}
                        numColumns={4}
                        style={{

                            backgroundColor: '#fff'
                        }}/>
                    </View>
                )
            } 
        }

    render() {

        return (
            <View style = {{ flex : 1, marginTop : 48}}>
                <Text style = {{fontSize : 18, fontWeight : '500' ,marginLeft : 16,}}>이미지 첨부</Text>
                <View style = {{flexDirection : 'row' , marginLeft : 16, paddingTop : 7 }}>
                    {this.plusorimage()}
                        
                </View>
                <View style ={{marginLeft : 16 , marginTop : 8}}>
                    <Text style = {{fontSize : 12, fontWeight : '400' , color : '#767676'}}>이미지는 JPEG, JPG, PNG, HEIC만 가능하며{"\n"}최대 3개까지 첨부 가능합니다.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default ComplainImage;
