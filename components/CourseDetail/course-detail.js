import React, { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import VideoPlayer from './VideoPlayer/video-player'
import VideoDescription from './VideoDecsription/video-description'
import ListPartsOfCourse from './PartsOfCourse/list-parts-of-course'
import { AuthorContext } from '../../provider/author-provider'
import ListCourses from '../Courses/ListCourses/list-courses'
import { ThemeContext } from '../../provider/theme-provider'
const CourseDetail = (props) => {
    let item = props.route.params.item
    const {theme} = useContext(ThemeContext)
    const {author} = useContext(AuthorContext)
    console.log(author)
    return (
        <ScrollView style = {{backgroundColor: theme.background}}>
           <VideoPlayer item={item} navigation={props.navigation}/>
           <VideoDescription item={item} navigation={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default CourseDetail
