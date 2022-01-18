import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

function Sidebar(props) {
    


    return (
        <View style={styles.container}>
            <View
                style={{
                    height: 201,
                    backgroundColor: '#5585E8',
                    borderBottomEndRadius: 15,
                    borderBottomStartRadius: 15
                }}>
                <View
                    style={{
                        flex: 2,
                        backgroundColor: '#5585E8'
                    }}></View>

                <View
                    style={{
                        flex: 3,
                        flexDirection: 'row',
                        alignItems : 'center',
                        marginLeft: 10,
                        marginBottom: 10,
                        marginRight: 39,


                    }}>
                    <Image
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: '#fff'
                        }}
                        source={require('../../../src/assets/jenny.jpg')}/>
                    <View
                        style={{
                            marginVertical : 7,

                            padding :10,
                            paddingVertical :5,
                        }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: 19,
                                    fontWeight: "700",
                                    color: '#fff'
                                }}>김쫀뷰</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginBottom : 4,
                                justifyContent: 'center'
                            }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 17,
                                    fontWeight: "500",
                                }}>여행성향 및 자기소개</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                borderColor: '#fff',
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('프로필');
                            }}
                            >
                            <Text
                                style={{
                                    color: '#fff'
                                }}>프로필 편집</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{
                    flex: 2
                }}></View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Sidebar;
