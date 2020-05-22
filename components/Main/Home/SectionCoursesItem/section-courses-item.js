import React from 'react';
import {View, StyleSheet, Image, Text,TouchableOpacity} from 'react-native';
import Star from 'react-native-star-view';
import Colors from '../../../../global/color'


const SectionCoursesItem = (props) => {
    const onPressListItem =()=>{
        props.navigation.navigate("Search")
    }
    return( <TouchableOpacity style = {styles.item} onPress={onPressListItem}>
        <Image source={props.item.image} style = {styles.image} />
        <Text style = {styles.title}>{props.item.title}</Text>
        <Text style = {{fontSize:14}}>{props.item.author}</Text>
        <Text style ={{color: 'darkgrey'}}>{`${props.item.level} . ${props.item.release} . ${props.item.duration}`}</Text>
        <Star score={props.item.rating} style={styles.starStyle}/>
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
        height: 135, 
        width: 250
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    starStyle:{
        width: 100,
        height: 20
    }
})

export default SectionCoursesItem;