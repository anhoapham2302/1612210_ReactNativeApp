import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

const TopAuthorItem = (props) => {
    const onPressListItem =()=>{
        props.navigation.navigate("AuthorProfile", {item: props.item})
    }
    return( <TouchableOpacity style = {styles.item} onPress={onPressListItem}>
        <Image source={{uri: 'https://lucloi.vn/wp-content/uploads/2020/03/90443889_1016737482055036_219143065531580416_n.jpg'}} style = {styles.image} />
        <Text style={styles.text}>{props.item.name}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image:{
        height: 70,
        width: 70,
        borderRadius: 35,
        marginTop: 5,
        marginRight:10
    },
    text:{
       paddingLeft:10
    }
})

export default TopAuthorItem
