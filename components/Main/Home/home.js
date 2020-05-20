import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionCourses from './SectionCourses/section-courses';
import { ScrollView } from 'react-native-gesture-handler';

const Home = (props) => {
    return <ScrollView>
        <SectionCourses title = "Learning"/>
        <SectionCourses title = "Bookmark"/>
        <SectionCourses title = "Bookmark"/>
        <SectionCourses title = "Bookmark"/>
        <SectionCourses title = "Bookmark"/>
    </ScrollView>
};

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Home;