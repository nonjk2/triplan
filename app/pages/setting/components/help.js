import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
class Helpcomponent extends Component {
    constructor(props) {
        super(props);
        
    }


    render() {

        return (
            <View style = {{ flex : 1, marginTop : 48}}>
                <Text style = {{ color : '#767676', paddingHorizontal : 16,}}>*다른 메뉴를 찾으시나요 ?</Text>
                <View style = {{flexDirection : 'row' , marginLeft : 16, paddingTop : 7 }}>
                    <View style ={{ alignItems : 'center' }}>
                        <TouchableOpacity style= {{ width : 80 , height : 80 , marginHorizontal : 4,}} onPress={() => {this.props.navigation.navigate("문의하기")}}>
                            <View style = {{borderWidth : 2, borderRadius : 15 , borderColor : '#C4C4C4', flex : 1 ,alignItems : 'center', justifyContent : 'center' }} >
                                <IonIcon name="create-outline"  size = {40}style = {{color : '#C4C4C4' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style = {{fontSize : 10 , fontWeight : '500' ,color : '#C4C4C4' , marginTop : 2,}}>문의하기</Text>
                    </View>
                    <View style ={{ alignItems : 'center' }}>
                        <TouchableOpacity style= {{ width : 80 , height : 80}}>
                            <View style = {{borderWidth : 2, borderRadius : 15  , borderColor : '#C4C4C4', flex : 1 ,alignItems : 'center', justifyContent : 'center' }} >
                                <IonIcon name="headset-outline"  size = {40}style = {{color : '#C4C4C4' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style = {{fontSize : 10 , fontWeight : '500' ,color : '#C4C4C4' ,marginTop : 2,}}>전화상담</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default Helpcomponent;
