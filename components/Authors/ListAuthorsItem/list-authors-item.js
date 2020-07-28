import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { apiAuthorDetail } from '../../../core/services/author-service'

const ListAuthorsItem = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
       apiAuthorDetail(props.item.id)
       .then((respone) => respone.json())
       .then((res) => setData(res.payload))
    }, [])
    const onPressListItem =()=>{
        props.navigation.navigate("AuthorProfile", {item:data})
    }
    return( <TouchableOpacity style = {styles.item} onPress = {onPressListItem}>
        <Image source={{uri: data.avatar}} style = {styles.image} />
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
    },
    image:{
        height: 70,
        width: 70,
        borderRadius: 35,
        marginTop:5,
        marginRight: 10
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
