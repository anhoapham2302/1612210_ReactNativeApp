import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import SectionCoursesItem from '../SectionCoursesItem/section-courses-item';
import { renderCourses } from '../../../../core/services/course-service';

const SectionCourses = (props) => {
    
    const renderListItems = (courses) => {
        return courses.map(item => <SectionCoursesItem navigation={props.navigation} item = {item}/>);
    }

    return <View style = {styles.view}>
        <View>
            <Text style = {styles.text}>{props.title}</Text>
        </View>
        <ScrollView horizontal={true}>
            {renderListItems(renderCourses(props.title).array)}
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    view:{
        marginTop: 5,
        marginLeft: 17
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    }
})

export default SectionCourses;