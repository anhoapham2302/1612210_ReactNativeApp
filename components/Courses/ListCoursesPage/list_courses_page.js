import React from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import ListCourses from '../ListCourses/list-courses'

export default function ListCoursesPage(props) {
    return (
       <ScrollView style = {{marginTop: 50}}>
           <ListCourses title = {props.route.params.title} com = {props.route.params.com} navigation={props.navigation}/>
       </ScrollView>
    )
}

const styles = StyleSheet.create({})
