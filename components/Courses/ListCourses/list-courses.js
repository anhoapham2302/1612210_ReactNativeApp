import React from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Button, SectionList, TouchableOpacity } from 'react-native'
import ListCoursesItem from '../ListCoursesItem/list-courses-item'
import Styles from '../../../global/style'

const ListCourses = (props) => {
    const courses = [
        {
            title: 'Mobile',
            data:  [
            {
                id : 1,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/1.jpg'),
                rating: 4
            },
            {
                id : 2,
                title: 'UI/UX Design',
                author: 'Author 2',
                level: 'Advance',
                release: 'May 6, 2020',
                duration: '50 hours',
                image: require('../../../assets/2.jpg'),
                rating: 4
            },
            {
                id : 3,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/3.jpg'),
                rating: 4
            },
            {
                id : 4,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/4.jpg'),
                rating: 4
            },
                ]   
        },
        {
            title: 'Web',
            data:  [
            {
                id : 5,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/1.jpg'),
                rating: 4
            },
            {
                id : 6,
                title: 'UI/UX Design',
                author: 'Author 2',
                level: 'Advance',
                release: 'May 6, 2020',
                duration: '50 hours',
                image: require('../../../assets/2.jpg'),
                rating: 4
            },
            {
                id : 7,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/3.jpg'),
                rating: 4
            },
            {
                id : 8,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/4.jpg'),
                rating: 4
            },
                ]         
        } 
    ]

    const renderSeparator = () => {
        return (
          <View
            style={Styles.renderseparator}
          />
        );
      };

    return (
        <View style={Styles.view}> 
            <SectionList 
                sections={courses}
                renderItem={({item})=><ListCoursesItem item = {item}/>}
                renderSectionHeader={({section: {title}}) => <View style={{backgroundColor: 'white', marginTop:10}}><Text style={Styles.text}>{title}</Text></View>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}


export default ListCourses;
