import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionCourses from './SectionCourses/section-courses';
import { ScrollView } from 'react-native-gesture-handler';
import ImageButton from '../../Common/image-button';


const Home = (props) => {
    return <ScrollView>
        <SectionCourses title = 'Learning' navigation ={props.navigation}/>
        <SectionCourses title = 'Sale Off' navigation ={props.navigation}/>
        <SectionCourses title = 'Design' navigation ={props.navigation}/>
        <SectionCourses title = 'Bookmark' navigation ={props.navigation}/>
    </ScrollView>
};

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Home;