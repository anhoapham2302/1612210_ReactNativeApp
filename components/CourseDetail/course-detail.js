import React, { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import VideoPlayer from './VideoPlayer/video-player'
import VideoDescription from './VideoDecsription/video-description'
import ListPartsOfCourse from './PartsOfCourse/list-parts-of-course'
import { AuthorContext } from '../../provider/author-provider'
const CourseDetail = (props) => {
    let item = props.route.params.item
    const {author} = useContext(AuthorContext)
    console.log(author)
    return (
        <ScrollView>
           <VideoPlayer item={item} navigation={props.navigation}/>
           <VideoDescription item={item} navigation={props.navigation}/>
           <ListPartsOfCourse/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default CourseDetail
