import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ListCourses from '../../Courses/ListCourses/list-courses'

const Downloads = (props) => {
    return (
        <ScrollView>
           <ListCourses/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Downloads
