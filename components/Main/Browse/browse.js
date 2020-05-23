import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ImageButton from '../../Common/image-button'
import TopAuthor from './TopAuthor/top-author'
import PopularSkills from './PopularSkills/popular-skills'
import SectionCourses from '../Home/SectionCourses/section-courses'
import SectionPaths from '../../Paths/SectionPaths/section-paths'


const Browse = (props) => {
    return (
        <ScrollView>
             <ImageButton title ='New Release' image = 'https://i.pinimg.com/564x/aa/ff/80/aaff80b53e415268590d82d67ac5a1a5.jpg'/>
             <ImageButton title ='Popular' image = 'https://i.pinimg.com/564x/aa/ff/80/aaff80b53e415268590d82d67ac5a1a5.jpg'/>
             <PopularSkills title = 'Popular Skills'/>
             <TopAuthor title = 'Top Authors' navigation ={props.navigation}/>
             <SectionCourses title = 'Top Courses' navigation ={props.navigation}/>
             <SectionPaths title = 'Paths' navigation ={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Browse;

