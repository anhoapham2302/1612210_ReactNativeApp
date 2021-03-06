import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ListCourses from "../ListCourses/list-courses";
import { apiNewRelease } from "../../../core/services/course-service";
import { apiRecommendCourses } from "../../../core/services/account-service";
import { AuthContext } from "../../../provider/auth-provider";
import { LanguageContext } from "../../../provider/language-provider";

export default function ListCoursesPage(props) {
  const {language} = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  var courses

  if (props.route.params.com === "NewRelease") {
    useEffect(() => {
      apiNewRelease()
        .then((respone) => respone.json())
        .then((json) => setData(json.payload))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  }
  if (props.route.params.com === "Recommend") {
    useEffect(() => {
      apiRecommendCourses(state.userInfo.id, 10, 0)
        .then((respone) => respone.json())
        .then((json) => setData(json.payload))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  }

  if (props.route.params.com === "Any") {
    useEffect(() => {
      setLoading(false);
    }, [])
  }

  if(loading === false)
  {
    if(props.route.params.com === "Any")
    {
      courses = props.route.params.data;
    }else{
      courses = data.filter(course => course.status === "COMPLETED");
    }
  }
  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ListCourses
          title={props.route.params.title}
          item={courses}
          com={props.route.params.com}
          navigation={props.navigation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
