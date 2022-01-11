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
import { DummyDATA } from '../../../util/forms/data';

const DATA = DummyDATA

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
