import React, { useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList, } from 'react-native'
import ListCoursesItem from '../ListCoursesItem/list-courses-item'
import Styles from '../../../global/style'
import courses from '../../../global/courses'
import { searchCourse, searchCourseOfAuthor, searchCourseOfRecommend } from '../../../core/services/search-service'
import { AuthContext } from '../../../provider/auth-provider'
import { FavContext } from '../../../provider/favorite-provider'
import { renderNewRelease } from '../../../core/services/course-service'
import { useReducer } from 'react'
const initialState = {data: [], isLoading: true, isError: false}
function reducer(state, action){
  switch (action.type){
    case "REQUEST_LIST_COURSES_SUCCESSED":
      return {...state, data: action.data, isLoading: false}
    default:
      throw new Error();
  }
}

const ListCourses = (props) => {
    const {auth} = useContext(AuthContext)
    const {fav} = useContext(FavContext)
    //const [data, setData] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState)
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
        if(com === 'Author'){
          return searchCourseOfAuthor(props.author).course
        }
        if(com === 'RecommendFromCourseDetail'){
          return searchCourseOfRecommend(props.item.path, props.item.cat, props.item.author, props.item.id).course
        }
        if(com === 'NewRelease'){     
          useEffect(() => {
            renderNewRelease().then((response) => response.json())
            .then((json) => dispatch({type: "REQUEST_LIST_COURSES_SUCCESSED", data: json.payload}))
            .catch((error) => console.error(error))
          }, [])
          return state.data;
        }  
    }
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
