import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import ListCourses from '../../Courses/ListCourses/list-courses'
import { AuthContext } from '../../../provider/auth-provider'
import { ThemeContext } from '../../../provider/theme-provider'
import { CoursesContext } from '../../../provider/course-provider'
import { requestReload } from '../../../action/account-action'
import { useIsFocused } from '@react-navigation/native'


const Downloads = (props) => {
    const {theme} = useContext(ThemeContext);
    const { courses } = useContext(CoursesContext);
    const coursesContext = useContext(CoursesContext);
    const {state} = useContext(AuthContext)
    useEffect(() => {
        coursesContext.renderFavoriteCourses(state.token);
    }, [useIsFocused()])
    return (
        <ScrollView style = {{backgroundColor: theme.background}}>       
            {courses.isLoading ? <ActivityIndicator/> :(            <ListCourses com = 'Downloads' item = {courses.data} navigation={props.navigation}/>
)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Downloads
