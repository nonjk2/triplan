import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import Profile from './components/profile';
import Textsetting from './components/textinput';
import Helpcomponent from './components/help';
class SettingScreen extends Component {
    constructor(props) {
        super(props);
        
    }
        
    render() {

        return (
            <SafeAreaView style = {{ flex :1 ,backgroundColor : '#fff'}}>
                <View style={{ flex : 1, backgroundColor : '#fff'}}>
                    <Profile/>
                    <Textsetting/>
                    <Helpcomponent
                        {...this.props}
                    />
                    <View style = {{ alignItems : 'center',flex :1, marginTop : 96,}}>
                        <TouchableOpacity onPress = {() => {this.props.navigation.navigate("문의하기")}}>
                            <Text style = {{fontSize : 15, fontWeight : '500' , color : 'red'}}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default SettingScreen;
