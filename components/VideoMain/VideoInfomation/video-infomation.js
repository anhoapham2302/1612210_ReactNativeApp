import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ThemeContext } from '../../../provider/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function VideoInfomation(props) {
    const {theme} = useContext(ThemeContext);
    console.log(props);
    const onBackButton = () => {
        props.navigation.navigate("CourseDetail", { item: {id: props.course_id} });
    }
    return (
        <View style = {styles.view}>
            <Text style = {{fontSize: 20, color: theme.foreground}}>{props.item.name}</Text>
            <Text style = {{fontSize: 14, color: 'darkgrey'}}>Thời lượng: {props.item.hours} giờ</Text>
            <TouchableOpacity onPress={onBackButton}>
                <Text>Quay về khóa học</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        marginLeft: 10
    }
})
