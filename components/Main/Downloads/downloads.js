import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ListCourses from '../../Courses/ListCourses/list-courses'
import { AuthContext } from '../../../provider/auth-provider'
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../../../provider/theme-provider'


const Downloads = (props) => {
    const {theme} = useContext(ThemeContext)
    useIsFocused();
    return (
        <ScrollView style = {{backgroundColor: theme.background}}>       
            <ListCourses com = 'Downloads' navigation={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Downloads
