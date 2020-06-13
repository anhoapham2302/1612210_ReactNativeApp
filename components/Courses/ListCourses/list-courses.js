import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, } from 'react-native'
import ListCoursesItem from '../ListCoursesItem/list-courses-item'
import Styles from '../../../global/style'
import courses from '../../../global/courses'
import { searchCourse } from '../../../core/services/search-service'
import { AuthContext } from '../../../provider/auth-provider'
import { FavContext } from '../../../provider/favorite-provider'

const ListCourses = (props) => {
    const {auth} = useContext(AuthContext)
    const {fav} = useContext(FavContext)
    const renderSeparator = () => {
        return (
          <View
            style={Styles.renderseparator}
          />
        );
      };

    const checkComponent = (com) => {
        if(com === 'Search'){
            return searchCourse(props.text).course
        }
        if(com === 'Downloads'){
            return fav
        }
    }
    //console.log(auth)
      return (
        <View style={Styles.view}> 
        <View>
            <Text style = {Styles.text}>{props.title}</Text>
        </View>
            <FlatList
                data={checkComponent(props.com)}
                renderItem={({item})=><ListCoursesItem navigation ={props.navigation} item = {item}/>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

export default ListCourses;
