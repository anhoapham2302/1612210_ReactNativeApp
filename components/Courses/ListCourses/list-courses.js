import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  ScrollView
} from "react-native";
import ListCoursesItem from "../ListCoursesItem/list-courses-item";
import Styles from "../../../global/style";

import { AuthContext } from "../../../provider/auth-provider";

import { CoursesContext } from "../../../provider/course-provider";


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
      <FlatList
        data={props.item}
        renderItem={({ item }) => (
          <ListCoursesItem navigation={props.navigation} item={item} />
        )}
        ItemSeparatorComponent={renderSeparator}
      />   
    </View>
  );
};

export default ListCourses;
