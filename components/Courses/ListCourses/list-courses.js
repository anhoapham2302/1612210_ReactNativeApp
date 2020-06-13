import React from 'react'
import { StyleSheet, Text, View, FlatList, } from 'react-native'
import ListCoursesItem from '../ListCoursesItem/list-courses-item'
import Styles from '../../../global/style'
import courses from '../../../global/courses'
import { searchCourse } from '../../../core/services/search-service'

const ListCourses = (props) => {
    
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
                data={searchCourse(props.text).course}
                renderItem={({item})=><ListCoursesItem navigation ={props.navigation} item = {item}/>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

export default ListCourses;
