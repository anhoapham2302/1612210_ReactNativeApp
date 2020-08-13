import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ListLessons from "../../Courses/ListLessons/list_lessons";
import { ThemeContext } from "../../../provider/theme-provider";
import { AuthContext } from "../../../provider/auth-provider";
import { LessonContext } from "../../../provider/lesson-provider";
import { getExerciseAction } from "../../../action/lesson-action";
import { TouchableOpacity } from "react-native-gesture-handler";

const initialLayout = { width: Dimensions.get("window").width };

export default function VideoTab(props) {
  const { theme } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const { state } = useContext(AuthContext);
  const lessonContext = useContext(LessonContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    lessonContext.getLesson(state.token, props.course_id);
  }, []);

  const exercise = (res) => {
    if (res !== undefined) {
      setData(res.payload);
      setLoading(false);
    }
  };

  useEffect(() => {
    getExerciseAction(state.token, props.lesson_id, exercise);
  }, []);

  const FirstRoute = () => (
    <View>
      <ListLessons navigation={props.navigation}/>
    </View>
  );

  const SecondRoute = () =>
    loading ? (
      <ActivityIndicator />
    ) : data.exercises.length === 0 ? (
      <View>
        <Text>Không có bài tập</Text>
      </View>
    ) : (
      <View>
          <Text style={ { color: theme.foreground, fontSize: 17, fontWeight: 'bold', marginLeft: 10, marginTop: 5 }}>Danh sách bài tập</Text>
        {data.exercises.map((item) => {
          return (<TouchableOpacity       style={{ flexDirection: "row", margin: 5, marginLeft: 10 }}
          >
                    <Text style={{ color: theme.foreground, fontSize: 15 }}> - {item.title}</Text>
               </TouchableOpacity>)
        })}
      </View>
    );

  const [routes] = useState([
    { key: "lesson", title: "Bài học" },
    { key: "exercise", title: "Bài tập" },
    // { key: "recommend", title: "Gợi ý" },
  ]);
  const renderScene = SceneMap({
    lesson: FirstRoute,
    exercise: SecondRoute,
    // recommend: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "red" }}
      style={{ backgroundColor: theme.background, borderColor: "red" }}
      labelStyle={{ color: "red" }}
    />
  );
  return (
    <View>
      <TabView
        style={{ marginTop: 15 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
