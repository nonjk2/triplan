import React, {Component,useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
 
class InviteFriendsItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    borderWidth = () => {

    }

    render() {
        return (
            <View style={styles.invitebutton}>
                <Image
                    source={require('../../../../src/assets/jenny.jpg')}
                    style={{width: 80,
                            height: 80,
                            borderRadius: 15,
                            flexWrap: 'wrap',
                            borderColor : '#5585E8',
                            borderWidth : this.props.item.isSelected ? 2:0
                            
                            }}/>
                <View style={styles.invitecontain}>
                    <View style={styles.inviteView}>
                        <Text style={styles.friendsnamestyle}>{this.props.nickname}#{this.props.id}</Text>
                        <Text style={styles.friendsIntro}>{this.props.introduce}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    invitebutton: {
        flexDirection: 'row',
        flex : 1,
        alignItems : 'center',
        marginVertical: 5
    },
    invitelistimage: {
        
    },
    invitecontain: {
        flex: 2,
        marginLeft: 10,
        justifyContent: 'center'
    },
    ddaystyle: {

        backgroundColor: "#5585E8",
        borderRadius: 30,
        color: 'white'
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
    }

});

export default InviteFriendsItems;
