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

const initialState = {data: [], isLoading: true, isError: false}

const Home = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [state, dispatch] = useReducer(coursesReducer, initialState)
    useEffect(() => {
       

       fetch('https://api.itedu.me/category/all', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        }).then((respone)=>respone.json())
            .then((json)=>setData(json.payload))
            .catch((error) => console.error(error))
            .finally(()=> setLoading(false))
    },[])
    const {theme} = useContext(ThemeContext)
    // const {bookmark} = useContext(BookmarkContext)
    // const renderBookmark = () =>{
    //     if (bookmark.length === 0){
    //         return <View/>
    //     }else{
    //         return <SectionCourses title = 'Bookmarks' navigation ={props.navigation}/>
    //     }
    // }
    const renderSectionCourse = (courses) => { 
        return courses.map(item =>  <SectionCourses title = {item.name} course_id = {item.id} navigation ={props.navigation}/>)
    }
    return <ScrollView style = {{backgroundColor: theme.background}}>
        {isLoading ? <ActivityIndicator/> : (
            renderSectionCourse(data)
         )}
        
        {/* <SectionCourses title = 'Learning' course_id = '4eb0c150-8212-44ef-a90b-fcd40130ac01' navigation ={props.navigation}/>  */}
        {/* <SectionCourses title = 'Design' navigation ={props.navigation}/> */}
        {/* <SectionCourses title = 'Web Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Mobile Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Game Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Databases Development' navigation ={props.navigation}/> */}
        {/* {renderBookmark()}     */}
    </ScrollView>
};

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Home;