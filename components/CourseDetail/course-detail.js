import React, { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import VideoPlayer from './VideoPlayer/video-player'
import VideoDescription from './VideoDecsription/video-description'
import ListPartsOfCourse from './PartsOfCourse/list-parts-of-course'
import { AuthorContext } from '../../provider/author-provider'
import ListCourses from '../Courses/ListCourses/list-courses'
const CourseDetail = (props) => {
    let item = props.route.params.item
    const {author} = useContext(AuthorContext)
    console.log(author)
    return (
        <ScrollView>
           <VideoPlayer item={item} navigation={props.navigation}/>
           <VideoDescription item={item} navigation={props.navigation}/>
           <ListCourses title = 'Recommended' item={item} com = 'RecommendFromCourseDetail' navigation={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default CourseDetail
