import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { ThemeContext } from '../../../../provider/theme-provider'

const TopAuthorItem = (props) => {
    const {theme} = useContext(ThemeContext)
    const onPressListItem =()=>{
        props.navigation.navigate("AuthorProfile", {item: props.item})
    }
    return( <TouchableOpacity style = {styles.item} onPress={onPressListItem}>
        <Image source={props.item.avatar} style = {styles.image} />
        <Text style={{fontSize: 14, color: theme.foreground,  paddingLeft:8}}>{props.item.name}</Text>
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
