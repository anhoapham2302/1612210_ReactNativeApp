import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Star from 'react-native-star-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SectionCoursesItem = (props) => {
    return <TouchableOpacity style = {styles.item}>
        <Image source={props.item.image} style = {{height: 135, width: 250}} />
        <Text style = {styles.title}>{props.item.title}</Text>
        <Text style = {{fontSize:14}}>{props.item.author}</Text>
        <Text style ={{color: 'darkgrey'}}>{`${props.item.level} . ${props.item.release} . ${props.item.duration}`}</Text>
        <Star score={props.item.rating} style={styles.starStyle}/>
    </TouchableOpacity>
};
const styles = StyleSheet.create({
    item:{
        margin: 5,
        width: 250,
        height: 220,
        backgroundColor: 'ghostwhite'
    },
    title:{
        fontSize: 17,
        fontWeight: "bold"
    },
    starStyle:{
        width: 100,
        height: 20
    }
})

export default SectionCoursesItem;