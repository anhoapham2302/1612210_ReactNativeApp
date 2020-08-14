import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { ThemeContext } from '../../../provider/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDetailLessonAction } from '../../../action/lesson-action';
import { AuthContext } from '../../../provider/auth-provider';
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../../../provider/language-provider';

export default function VideoInfomation(props) {
    const {language} = useContext(LanguageContext);
    const {theme} = useContext(ThemeContext);
    const {state} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const onBackButton = () => {
        props.navigation.navigate("CourseDetail", { item: {id: props.course_id} });
    }
    const lessonDetails = res => {
        if(res !== undefined)
        {
            setData(res.payload);
            setLoading(false);
        }
    }  

    useEffect(() => {
        if(isFocused === true)
        {   
            getDetailLessonAction(state.token, props.course_id, props.item.lessonId || props.item.id, lessonDetails)
        }
    }, [isFocused])
    return (
        <View>
            {loading ? <ActivityIndicator/> : (
                <View style = {styles.view}>
                <Text style = {{fontSize: 20, color: theme.foreground}}>{data.name}</Text>
            <Text style = {{fontSize: 14, color: 'darkgrey'}}>{language.time}: {data.hours} {language.hour}</Text>
                <TouchableOpacity onPress={onBackButton}>
            <Text>{language.backCourse}</Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
        
    )
}

const styles = StyleSheet.create({
    view: {
        marginLeft: 10
    }
})
