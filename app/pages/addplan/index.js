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
        introduce : "안녕하세요 난 저녀니입니다 dev_tez !!",
        source : 'https://img.insight.co.kr/static/2021/06/10/700/img_20210610080035_f201a223.webp'
    }, {
        nickname: '김쫀쀼',
        image_id: 'one',
        freinds_id: "0002",
        introduce : "안녕하세요 난 천재입니다 +_+ ",
        source : 'https://t1.daumcdn.net/cfile/tistory/990BE94C5BE7FC5E08'

    }, {
        nickname: '임태끼',
        image_id: 'one',
        freinds_id: "0003",
        introduce : "안녕하세여 저는 임태형입니다 ㅎㅎ",
        source : 'https://i.ytimg.com/vi/fA3bmMhLX8c/hqdefault.jpg'
    }, {
        nickname: '환이',
        image_id: 'one',
        freinds_id: "0004",
        introduce : "안녕하세여 저는 김 환 입 니 다 ?",
        source : 'https://www.cnbnews.com/data/photos/cdn/20210833/art_1629612303.jpg'
    }, {
        nickname: '은돌',
        image_id: 'one',
        freinds_id: "0005",
        introduce : "hi",
        source : 'https://images.khan.co.kr/article/2021/01/08/l_2021010802000388200068931.jpg'
    }, {
        nickname: '넌누구니',
        image_id: 'one',
        freinds_id: "0006",
        introduce : "i don't know who i Am",
        source : 'https://w.namu.la/s/f21af41d2334b16f5da4c187b6f38ee910673da611ac33ec15be826208cdce02afcb2cd7096414957ef6be53537b75547e8e279ad3400029da948e04b955fd33c7a382087a9a6e265553a7eb4e992dc8b11d3007a678a2d90cdf991e057c57e3'
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
