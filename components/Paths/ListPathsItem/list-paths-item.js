import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const ListPathsItem = (props) => {
    return( <TouchableOpacity style = {styles.item}>
        <Image source={{uri: 'https://cdn.dribbble.com/users/66221/screenshots/1655593/html5.png'}} style = {styles.image} />
        <View style={styles.text}>
        <Text style={styles.name}>{props.item.name}</Text>
        <Text style={{color:'darkgrey'}}>{`Courses: ${props.item.count}`}</Text>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
    },
    image:{
        height: 105,
        width: 140,
        marginTop:5

    },
    name:{
        fontSize: 17,
        fontWeight: 'bold',
    },
    text:{
        paddingLeft: 5
    }
})
export default ListPathsItem
