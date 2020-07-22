import React from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import ListCourses from '../ListCourses/list-courses'

export default function ListCoursesPage(props) {
    return (
       <ScrollView>
           <ListCourses title = {props.route.params.title} com = {props.route.params.com} navigation={props.navigation}/>
       </ScrollView>
    )
}

const styles = StyleSheet.create({})
