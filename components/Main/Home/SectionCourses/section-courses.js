import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import SectionCoursesItem from '../SectionCoursesItem/section-courses-item';
import { renderCourses } from '../../../../core/services/course-service';

const SectionCourses = (props) => {
     const courses = [
        {
            id : 1,
            title: 'React Native',
            author: 'Author 1',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../../../assets/1.jpg'),
            rating: 4
        },
        {
            id : 2,
            title: 'UI/UX Design',
            author: 'Author 2',
            level: 'Advance',
            release: 'May 6, 2020',
            duration: '50 hours',
            image: require('../../../../assets/2.jpg'),
            rating: 4
        },
        {
            id : 3,
            title: 'ASP.NET',
            author: 'Author 3',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../../../assets/3.jpg'),
            rating: 4
        },
        {
            id : 4,
            title: 'AWS',
            author: 'Author 4',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../../../assets/4.jpg'),
            rating: 4
        },
    ]
    
    //const [course, setCourse] = useState([]);
    // useEffect(() => {
    //     if(status && status.status === 100){
    //          co = status.array
    //     }
    //  }, [status]) 
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