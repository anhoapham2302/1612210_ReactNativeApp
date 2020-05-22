import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ImageButton from '../../Common/image-button'
import TopAuthor from './TopAuthor/top-author'
import PopularSkills from './PopularSkills/popular-skills'
import SectionCourses from '../Home/SectionCourses/section-courses'


const Browse = (props) => {
    return (
        <ScrollView>
             <ImageButton title ='New Release' image = 'https://i.pinimg.com/564x/aa/ff/80/aaff80b53e415268590d82d67ac5a1a5.jpg'/>
             <ImageButton title ='Popular' image = 'https://i.pinimg.com/564x/aa/ff/80/aaff80b53e415268590d82d67ac5a1a5.jpg'/>
             <PopularSkills title = 'Popular Skills'/>
             <TopAuthor title = 'Top Authors'/>
             <SectionCourses title = 'Top Courses'/>
             <SectionCourses title = 'Paths'/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Browse;

