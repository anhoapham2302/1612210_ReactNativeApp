import React, { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import VideoPlayer from './VideoPlayer/video-player'
import VideoDescription from './VideoDecsription/video-description'
import ListCourses from '../Courses/ListCourses/list-courses'
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../../provider/theme-provider'
const CourseDetail = (props) => {
    let item = props.route.params.item
    const {theme} = useContext(ThemeContext)
    useIsFocused();
    return (
        <ScrollView style = {{backgroundColor: theme.background}}>
           <VideoPlayer item={item} navigation={props.navigation}/>
           <VideoDescription item={item} navigation={props.navigation}/>
           <ListCourses title = 'Recommended' item={item} com = 'RecommendFromCourseDetail' navigation={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default CourseDetail
