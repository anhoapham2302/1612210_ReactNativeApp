import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function ListLessonItem(props) {
    // console.log(props);
    return (
       <TouchableOpacity>
            {/* <Image source={{uri: props.item.imageUrl}} style = {styles.image} /> */}
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view:{
        marginLeft:5
    },
    item: {
        flexDirection: 'row',
    },
    
    image:{
        height: 105, 
        width: 140,
        marginTop:5
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    starStyle:{
        width: 110,
        height: 20,
        marginBottom: 2
    }
})
