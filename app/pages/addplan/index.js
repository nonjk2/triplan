import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    ScrollView
} from 'react-native';
import Textplanform from './components/textinput';
import InviteList from './components/invitelist';

const DATA = [
    {
        nickname: '저녀니',
        image_id: 'one',
        freinds_id: "0001",
        introduce : "안녕하세요 난 저녀니입니다 dev_tez !!"
    }, {
        nickname: '김쫀쀼',
        image_id: 'one',
        freinds_id: "0002",
        introduce : "안녕하세요 난 천재입니다 +_+ "

    }, {
        nickname: '임태끼',
        image_id: 'one',
        freinds_id: "0003",
        introduce : "안녕하세여 저는 임태형입니다 ㅎㅎ"
    }, {
        nickname: '환이',
        image_id: 'one',
        freinds_id: "0004",
        introduce : "안녕하세여 저는 김 환 입 니 다 ?"
    }, {
        nickname: '은돌',
        image_id: 'one',
        freinds_id: "0005",
        introduce : "hi"
    }, {
        nickname: '넌누구니',
        image_id: 'one',
        freinds_id: "0006"
    }
];

class AddplanScreen extends Component {

    state = {
        myTextInput: '',
        data : DATA,
    }
    render() {

        return (
            <View style={{
                    flex: 1,

                }}>
                <ScrollView style={styles.container}>
                    <Textplanform/>
                </ScrollView>
                <View style ={styles.invitelist}>
                    <InviteList data = {this.state.data}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    invitelist: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingLeft: 16,
        paddingRight: 16
    }
});

export default AddplanScreen;
