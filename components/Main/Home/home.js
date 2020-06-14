import React, { useContext } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SectionCourses from './SectionCourses/section-courses';
import { ScrollView } from 'react-native-gesture-handler';
import ImageButton from '../../Common/image-button';
import { useIsFocused } from '@react-navigation/native';
import { BookmarkContext } from '../../../provider/bookmark-provider';
import { ThemeContext } from '../../../provider/theme-provider';
import { themes } from '../../../global/theme';

const Home = (props) => {
    const {theme} = useContext(ThemeContext)
    const {bookmark} = useContext(BookmarkContext)
    const renderBookmark = () =>{
        if (bookmark.length === 0){
            return <View/>
        }else{
            return <SectionCourses title = 'Bookmarks' navigation ={props.navigation}/>
        }
    }
    useIsFocused()
    return <ScrollView style = {{backgroundColor: theme.background}}>
        {/* <SectionCourses title = 'Learning' navigation ={props.navigation}/> */}
        {/* <SectionCourses title = 'Design' navigation ={props.navigation}/> */}
        <SectionCourses title = 'Web Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Mobile Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Game Development' navigation ={props.navigation}/>
        <SectionCourses title = 'Databases Development' navigation ={props.navigation}/>
        {renderBookmark()}    
    </ScrollView>
};

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Home;