import React, { useContext, useState, useEffect, useReducer} from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import SectionCourses from './SectionCourses/section-courses';
import { ScrollView } from 'react-native-gesture-handler';
import ImageButton from '../../Common/image-button';
import { useIsFocused } from '@react-navigation/native';
// import { BookmarkContext } from '../../../provider/bookmark-provider';
import { ThemeContext } from '../../../provider/theme-provider';
import { themes } from '../../../global/theme';
import { coursesReducer } from '../../../reducer/courses-reducer';
import { AuthContext } from '../../../provider/auth-provider';
import { getAllCatAction } from '../../../action/course-action';
import { apiGetAllCat } from '../../../core/services/course-service';

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
        return courses.map(item =>  <SectionCourses title = {item.name} course_id = {item.id} navigation ={props.navigation}/>)
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