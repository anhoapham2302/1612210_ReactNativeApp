import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import SectionCoursesItem from '../SectionCoursesItem/section-courses-item';

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
            title: 'React Native',
            author: 'Author 1',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../../../assets/3.jpg'),
            rating: 4
        },
        {
            id : 4,
            title: 'React Native',
            author: 'Author 1',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../../../assets/4.jpg'),
            rating: 4
        },
    ]

    const renderListItems = (courses) => {
        return courses.map(item => <SectionCoursesItem item = {item}/>);
    }

    return <View style = {styles.view}>
        <View>
            <Text style = {styles.text}>{props.title}</Text>
        </View>
        <ScrollView horizontal={true}>
            {renderListItems(courses)}
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    view:{
        marginTop: 15,
        marginLeft: 5
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    }
})

export default SectionCourses;