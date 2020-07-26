import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ListCourses from '../../Courses/ListCourses/list-courses'
import { AuthContext } from '../../../provider/auth-provider'
import { ThemeContext } from '../../../provider/theme-provider'
import { CoursesContext } from '../../../provider/course-provider'


const Downloads = (props) => {
    const {theme} = useContext(ThemeContext)
    const coursesContext = useContext(CoursesContext)
    //coursesContext.requestReload();

    return (
        <ScrollView style = {{backgroundColor: theme.background}}>       
            <ListCourses com = 'Downloads' navigation={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Downloads
