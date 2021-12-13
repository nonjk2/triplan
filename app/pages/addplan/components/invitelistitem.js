import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

class InviteListItems extends Component {

    render() {

        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                <View style={styles.listbutton}>
                    <TouchableOpacity>
                        <View style={styles.invitecontain}>
                            <Image
                                source={require('../../../../src/assets/jenny.jpg')}
                                style={styles.invitelistimage}/>
                            <Text
                                style={{
                                    position : 'absolute',
                                    fontSize : 18,
                                    color : '#fff'
                                }}>{this.props.nickname}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listbutton: {

        justifyContent: 'center',
        margin: 5
    },
    invitelistimage: {
        width: 75,
        height: 75,
        borderRadius: 15
    },
    invitecontain: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default InviteListItems;
