import React from 'react'
import { StyleSheet, Text, View, FlatList, } from 'react-native'
import ListCoursesItem from '../ListCoursesItem/list-courses-item'
import Styles from '../../../global/style'

const ListCourses = (props) => {
    const courses = [
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
            title: 'ASP.NET',
            author: 'Author 3',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../../assets/3.jpg'),
            rating: 4
        },
        {
            id : 4,
            title: 'AWS',
            author: 'Author 4',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('    ../../../assets/4.jpg'),
            rating: 4
        },
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
        <View>
            <Text style = {Styles.text}>{props.title}</Text>
        </View>
            <FlatList
                data={courses}
                renderItem={({item})=><ListCoursesItem navigation ={props.navigation} item = {item}/>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

export default ListCourses;
