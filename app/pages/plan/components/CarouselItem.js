import React, {Component} from 'react';
import {Dimensions,StyleSheet, View, Text, Button, FlatList, Image} from 'react-native';

const {width, height} = Dimensions.get('window')

const CarouselItem = ({item}) =>{
    return(
        <View style = {styles.carView}>
            <Image style = {styles.image} source = {require('../../../../src/assets/jenny.jpg')}/>
            <View style = {styles.textView}>
                <Text style = {styles.itemTitle}>{item.title}</Text>
                <Text style = {styles.itemDescription}>{item.description}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    carView : {
        flex : 1 ,
        width : width,
        height : height /4,
        backgroundColor : 'white', 

        borderRadius : 10,
        shadowColor : '#000',
        shadowOffset :{width : 0.5, height : 0.5},
        shadowOpacity :0.5,
        shadowRadius :3,
        elevation :5,


    },
    textView : {
        position : 'absolute',
        bottom : '5%',
        margin : 10,
        left : '5%',
    },
    image : {
        width : width ,
        height :height / 4,
        // borderRadius : 10,

    },
    itemTitle : {
        color : 'white',
        fontSize : 22,
        shadowColor : '#000',
        shadowOffset : {width : 0.8 ,height : 0.8},
        shadowOpacity : 1,
        shadowRadius : 3,
        marginBottom :5,
        fontWeight : "bold",
        elevation : 5
    },
    itemDescription : {
        color : 'white',
        fontSize : 12,
        shadowColor : '#000',
        shadowOffset : {width : 0.8 ,height : 0.8},
        shadowOpacity : 1,
        shadowRadius : 3,
        fontWeight : "bold",
        elevation : 5

    },
    

})

export default CarouselItem