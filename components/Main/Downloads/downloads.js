import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ListCourses from '../../Courses/ListCourses/list-courses'
import { AuthContext } from '../../../provider/auth-provider'
import { FavContext } from '../../../provider/favorite-provider'
import { useIsFocused } from '@react-navigation/native';


const Downloads = (props) => {
    useIsFocused();
    
    return (
        <ScrollView>       
            <ListCourses com = 'Downloads' navigation={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Downloads
