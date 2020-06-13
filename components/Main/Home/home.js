import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SectionCourses from './SectionCourses/section-courses';
import { ScrollView } from 'react-native-gesture-handler';
import ImageButton from '../../Common/image-button';


const Home = (props) => {
    return <ScrollView>
        {/* <SectionCourses title = 'Learning' navigation ={props.navigation}/> */}
        {/* <SectionCourses title = 'Design' navigation ={props.navigation}/> */}
        <SectionCourses title = 'Web Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Mobile Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Game Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Databases Development' navigation ={props.navigation}/>
    </ScrollView>
};

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Home;