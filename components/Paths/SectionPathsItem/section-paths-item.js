import React from 'react';
import {View, StyleSheet, Image, Text,TouchableOpacity} from 'react-native';
import Colors from '../../../global/color'


const SectionPathsItem = (props) => {
    const onPressListItem =()=>{
        props.navigation.navigate("Paths", {item: props.item})
    }
    return( <TouchableOpacity style = {styles.item} onPress={onPressListItem}>
        <Image source={{uri: 'https://cdn.dribbble.com/users/66221/screenshots/1655593/html5.png'}} style = {styles.image} />
        <Text style = {styles.title}>{props.item.name}</Text>
        <Text style ={{color: 'darkgrey'}}>{`Courses: ${props.item.count}`}</Text>
    </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    item:{
        marginTop:5, marginRight:10,
        width: 250,
        height: 220,
        backgroundColor: Colors.backgroundItem,
        shadowColor: '#000',
        shadowOffset: {
	        width: 0,
        	height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image:{
        height: 170, 
        width: 250
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold'
    },
})

export default SectionPathsItem;