import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import VideoPlayer from './VideoPlayer/video-player'
import VideoDescription from './VideoDecsription/video-description'
import ListPartsOfCourse from './PartsOfCourse/list-parts-of-course'
const CourseDetail = (props) => {
    let item = props.route.params.item
    return (
        <ScrollView>
           <VideoPlayer/>
           <VideoDescription item={item} navigation={props.navigation}/>
           <ListPartsOfCourse/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default CourseDetail
