import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Star from 'react-native-star-view';
const ListCoursesItem = (props) => {
return (
    <TouchableOpacity style = {styles.item}>
        <Image source={props.item.image} style = {styles.image} />
        <View >
        <Text style = {styles.title}>{props.item.title}</Text>
        <Text style = {{fontSize:14}}>{props.item.author}</Text>
        <Text style ={{color: 'darkgrey'}}>{`${props.item.level} . ${props.item.release} . ${props.item.duration}`}</Text>
        <Star score={props.item.rating} style={styles.starStyle}/>
        </View>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        
    },
    
    image:{
        margin: 5,
        marginRight:0,
        height: 105, 
        width: 140
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

export default ListCoursesItem

