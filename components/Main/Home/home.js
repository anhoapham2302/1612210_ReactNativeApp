import React, { useContext, useState, useEffect,} from 'react';
import {ActivityIndicator, View, StyleSheet,} from 'react-native';
import SectionCourses from './SectionCourses/section-courses';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeContext } from '../../../provider/theme-provider';
import { getAllCatAction } from '../../../action/course-action';

const initialState = {data: [], isLoading: true, isError: false}

const Home = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const allCat = res =>
    {
        if(res !== undefined)
        {
            setData(res.payload);
            setLoading(false);
        }
    }
    useEffect(() => {    
        getAllCatAction(allCat);  
    },[])

    const {theme} = useContext(ThemeContext)

    const renderSectionCourse = (courses) => { 
        return courses.map(item =>  <SectionCourses key = {item.id.toString()} title = {item.name} course_id = {item.id} navigation ={props.navigation}/>)
    }
    return <ScrollView style = {{backgroundColor: theme.background}}>
        {isLoading ? <ActivityIndicator/> : (
            renderSectionCourse(data)
         )}
        
    </ScrollView>
};

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Home;