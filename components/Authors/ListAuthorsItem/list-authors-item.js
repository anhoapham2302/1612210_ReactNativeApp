import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const ListAuthorsItem = (props) => {
    return( <TouchableOpacity style = {styles.item}>
        <Image source={{uri: 'https://lucloi.vn/wp-content/uploads/2020/03/90443889_1016737482055036_219143065531580416_n.jpg'}} style = {styles.image} />
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
        height: 70,
        width: 70,
        borderRadius: 35,
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
export default ListAuthorsItem
