import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ListCoursesItem from "../ListCoursesItem/list-courses-item";
import Styles from "../../../global/style";
import courses from "../../../global/courses";
import {
  searchCourse,
  searchCourseOfAuthor,
  searchCourseOfRecommend,
} from "../../../core/services/search-service";
import { AuthContext } from "../../../provider/auth-provider";
import { FavContext } from "../../../provider/favorite-provider";
import {
  renderNewRelease,
  apiNewRelease,
  apiSearchCourses,
} from "../../../core/services/course-service";
import { useReducer } from "react";
import { coursesReducer } from "../../../reducer/courses-reducer";
import { CoursesContext } from "../../../provider/course-provider";
import { apiRecommendCourses } from "../../../core/services/account-service";

const initialState = { data: [], isLoading: true, isError: false };

const ListCourses = (props) => {
  const authContext = useContext(AuthContext);
  const coursesContext = useContext(CoursesContext);
  const { state } = useContext(AuthContext);
  const { courses } = useContext(CoursesContext);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true)  //const [state, dispatch] = useReducer(coursesReducer, initialState)
  //const [state, dispatch] = useReducer(coursesReducer, initialState)

  const renderSeparator = () => {
    return <View style={Styles.renderseparator} />;
  };
  return (
    <View style={Styles.view}>
      {/* {state.isLoading && <ActivityIndicator/>} */}
      {/* <View>
            <Text style = {Styles.text}>{props.title}</Text>
        </View> */}
        {/* {isLoading ? <ActivityIndicator/> : (  */}
        <FlatList
        data={props.item}
        renderItem={({ item }) => (
          <ListCoursesItem navigation={props.navigation} item={item} />
        )}
        ItemSeparatorComponent={renderSeparator}
      />
      {/* )} */}
     
    </View>
  );
};

export default ListCourses;
