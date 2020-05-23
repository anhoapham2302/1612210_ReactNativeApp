import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'

const ListPartsOfCourseItem = (props) => {
    return( <TouchableOpacity style = {styles.item}>
        <Image source={{uri: 'https://tru-vue.com/wp-content/uploads/2017/05/video-icon-600x600.jpg'}} style = {styles.image} />
        <View style={styles.text}>
        <Text style={styles.name}>{props.item.name}</Text>
        <Text style={{color:'darkgrey'}}>{`Duration: ${props.item.duration}`}</Text>
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
export default ListPartsOfCourseItem
