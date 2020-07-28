import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../../provider/theme-provider";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ListLessonItem(props) {
  const { theme } = useContext(ThemeContext);
  const onPressListItem = () => {
    props.navigation.navigate("VideoPlayer", {item: props.item, course_id: props.course_id});
  };
  return (
    <TouchableOpacity
      onPress={onPressListItem}
      style={{ flexDirection: "row", margin: 5, marginLeft: 10 }}
    >
      <Ionicons
        name="logo-youtube"
        color={theme.foreground}
        style={{ marginTop: 5, marginRight: 5 }}
      />
      <Text style={{ color: theme.foreground, fontSize: 15 }}>
        Bài {props.item.numberOrder}: {props.item.name}
      </Text>
    </TouchableOpacity>
  );
}
