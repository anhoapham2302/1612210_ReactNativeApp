import React, { useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ImageButton from '../../Common/image-button'
import SectionCourses from '../Home/SectionCourses/section-courses'
import { ThemeContext } from '../../../provider/theme-provider'
import ListAuthor from '../../Authors/ListAuthors/list-authors'
import { LanguageContext } from '../../../provider/language-provider'


const Browse = (props) => {
    const {language} = useContext(LanguageContext);
    const {theme} = useContext(ThemeContext)
    return (
        <ScrollView style = {{backgroundColor: theme.background}}>
             <ImageButton title ={language.newRelease} com = 'NewRelease' image = 'https://i.pinimg.com/564x/aa/ff/80/aaff80b53e415268590d82d67ac5a1a5.jpg'navigation ={props.navigation}/>
             <ImageButton title ={language.recommend} com = 'Recommend' image = 'https://i.pinimg.com/564x/aa/ff/80/aaff80b53e415268590d82d67ac5a1a5.jpg' navigation ={props.navigation}/>
             {/* <PopularSkills title = 'Popular Skills'/> */}
             <ListAuthor title = {language.instructor} navigation ={props.navigation}/>
             <SectionCourses title = {language.topSell} navigation ={props.navigation}/>
             <SectionCourses title = {language.topRate} navigation ={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Browse;

