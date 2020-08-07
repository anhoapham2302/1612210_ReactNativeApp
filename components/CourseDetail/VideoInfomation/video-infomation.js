import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ThemeContext } from '../../../provider/theme-provider'

export default function VideoInfomation(props) {
    const {theme} = useContext(ThemeContext);
    return (
        <View style = {styles.view}>
            <Text style = {{fontSize: 20, color: theme.foreground}}>{props.item.name}</Text>
            <Text style = {{fontSize: 14, color: 'darkgrey'}}>Thời lượng: {props.item.hours} giờ</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        marginLeft: 10
    }
})
