import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionCourses from './SectionCourses/section-courses';
import { ScrollView } from 'react-native-gesture-handler';
import ImageButton from '../../Common/image-button';

const Home = (props) => {
    return <ScrollView>
        <ImageButton title ="New Release"/>
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