import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import ListLessonItem from "../ListLessonItem/list_lesson_item";
import { LessonContext } from "../../../provider/lesson-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";


export default function ListLessons(props) {
  const {language} = useContext(LanguageContext);
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
            * {language.click}
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
