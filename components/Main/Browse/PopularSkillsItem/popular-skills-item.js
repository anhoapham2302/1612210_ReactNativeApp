import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Colors from '../../../../global/color'

const PopularSkillsItem = (props) => {
    return( <TouchableOpacity style = {styles.boder}>
        <Text style={styles.text}>{props.item.name}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boder:{
        height:35,
        backgroundColor: Colors.backgroundItem,
        borderRadius:10,
        marginTop:5,
        marginRight:5
    },
    text:{
        textAlign: 'center',
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight:10
    }
})

export default PopularSkillsItem
