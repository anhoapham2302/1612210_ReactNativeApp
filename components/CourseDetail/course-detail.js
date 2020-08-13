import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import VideoDescription from "./VideoDecsription/video-description";
import { ThemeContext } from "../../provider/theme-provider";
import { AuthContext } from "../../provider/auth-provider";
import MainImage from "./MainImage/main-image";
import { apiCourseDetails } from "../../core/services/course-service";
import CourseAction from "./CourseAction/course-action";
import CourseDesc from "./CourseDecs/course-desc";
import TabViewCourse from "./TabViewCourse/tab-view-course";
import { getCourseDetailsAction } from "../../action/course-action";
const CourseDetail = (props) => {
  let item = props.route.params.item;
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const courseDetails = res => {
    if(res !== undefined){
      setData(res.payload);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourseDetailsAction(item.id, courseDetails)
  }, [loading]);

  return (
    <View style={{ backgroundColor: theme.background, marginTop: 30 }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
          <ScrollView stickyHeaderIndices={[0]}>
            <View style={{ backgroundColor: theme.background}}>
            <MainImage data={data} navigation={props.navigation}/>
          <CourseDesc data={data} navigation={props.navigation}/>
          <CourseAction data={data} navigation={props.navigation}/>
            </View>
          <TabViewCourse data={data} navigation={props.navigation}/>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default CourseDetail;
