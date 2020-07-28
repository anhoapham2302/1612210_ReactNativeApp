import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
} from "react-native";
import ListLessonItem from "../ListLessonItem/list_lesson_item";
import { LessonContext } from "../../../provider/lesson-provider";
import { AuthContext } from "../../../provider/auth-provider";
import { useIsFocused } from "@react-navigation/native";
import ListCoursesItem from "../ListCoursesItem/list-courses-item";
import { ThemeContext } from "../../../provider/theme-provider";
import { set } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ListLessons(props) {
  const { lesson } = useContext(LessonContext);
  const { theme } = useContext(ThemeContext);
  return (
    <ScrollView>
      {lesson.isLoading ? (
        <ActivityIndicator />
      ) : (
        <View  style={styles.view}>
          <Text
            style={{
              color: theme.foreground,
              fontSize: 14,
              fontStyle: "italic",
              color: "red",
            }}
          >
            * Nhấn vào bài học để xem video.
          </Text>
          {lesson.data.map((section) => {
            return (
              <View>
                <Text style={[styles.title, { color: theme.foreground }]}>
                  Phần: {section.name}
                </Text>

                <FlatList
                  data={section.lesson}
                  renderItem={({ item }) => (
                    <ListLessonItem navigation={props.navigation} item={item} course_id = {lesson.data[0].courseId}/>
                  )}
                />
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  view: {
    marginLeft: 10,
    marginTop: 5,
  },
});