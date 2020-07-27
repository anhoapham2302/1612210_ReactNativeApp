import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, SectionList, ScrollView, ActivityIndicator} from 'react-native'
import ListLessonItem from '../ListLessonItem/list_lesson_item'
import { LessonContext } from '../../../provider/lesson-provider'
import { AuthContext } from '../../../provider/auth-provider'
export default function ListLessons(props) {
    const {lesson} = useContext(LessonContext)
    const {state} = useContext(AuthContext)
    if(lesson.isLoading === false)
    {
        console.log(lesson.data.length);
    }
    return (
        <ScrollView>
            {lesson.isLoading ? <ActivityIndicator/> : (<SectionList
                    sections = {lesson.data}
                    renderItem = {({item}) => <ListLessonItem item = {item}/>} 
                    // renderSectionHeader={({section: {name}}) => <Text>{name}</Text>}
                />)}
              
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
