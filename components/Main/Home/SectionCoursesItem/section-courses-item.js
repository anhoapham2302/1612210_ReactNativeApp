import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Star from "react-native-star-view";
import { ThemeContext } from "../../../../provider/theme-provider";
import { AuthContext } from "../../../../provider/auth-provider";
import { apiGetLastWatchedLesson } from "../../../../core/services/course-service";
import { LessonContext } from "../../../../provider/lesson-provider";
import { apiGetVideoData } from "../../../../core/services/video-service";

const SectionCoursesItem = (props) => {
  const { theme } = useContext(ThemeContext);
  const {state} = useContext(AuthContext);
  const [getLessonProcess, setGetLessonProcess] = useState(true);
  const [data, setData] = useState(null);

  let isProcessCourse = false;
  if (props.item.process !== undefined) {
    isProcessCourse = true;
  }
  const checkName = () => {
    if (props.item.name) {
      return (
        <Text
          style={{ fontSize: 14, color: "darkgrey" }}
        >{`${props.item.name}`}</Text>
      );
    } else {
      if (props.item["instructor.user.name"]) {
        return (
          <Text
            style={{ fontSize: 14, color: "darkgrey" }}
          >{`${props.item["instructor.user.name"]}`}</Text>
        );
      } else {
        return (
          <Text style={{ fontSize: 14, color: "darkgrey" }}>
            {props.author}
          </Text>
        );
      }
    }
  };
  const checkPrice = (price) => {
    if (price === 0) {
      return (
        <Text style={{ fontSize: 17, color: "red", fontWeight: "bold" }}>
          Miễn phí
        </Text>
      );
    } else {
      return (
        <Text style={{ fontSize: 17, color: "red", fontWeight: "bold" }}>
          {price} VNĐ
        </Text>
      );
    }
  };

  const onPressListItem = () => {
    setGetLessonProcess(true);
    apiGetLastWatchedLesson(state.token, props.item.id).then((respone) => {
      if (respone.status === 200) {
        respone
          .json()
          .then((res) => {
            setData(res.payload);
          })
          .finally(() => setGetLessonProcess(false));
      }else{
        setGetLessonProcess(false);
      }
    });
  };

  useEffect(() => {
    if (getLessonProcess === false) {
      if (data !== null) {
        props.navigation.push("VideoMain", {
          item: data,
          course_id: props.item.id,
        });
      } else {
        props.navigation.push("CourseDetail", { item: props.item });
      }
    }
  }, [getLessonProcess]);

  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: theme.background }]}
      onPress={onPressListItem}
    >
      {isProcessCourse ? (
        <View>
          <Image
            source={{ uri: props.item.courseImage }}
            style={styles.image}
          />
          <View style={styles.view}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginBottom: 1,
                color: theme.foreground,
              }}
            >
              {props.item.courseTitle}
            </Text>
            <Text style={{ fontSize: 14, color: "darkgrey" }}>
              {props.item.instructorName}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Image source={{ uri: props.item.imageUrl }} style={styles.image} />
          <View style={styles.view}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginBottom: 1,
                color: theme.foreground,
              }}
            >
              {props.item.title}
            </Text>
            {checkName()}
            <Star
              score={
                (props.item.contentPoint +
                  props.item.formalityPoint +
                  props.item.presentationPoint) /
                3
              }
              style={styles.starStyle}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#62DDBD",
                }}
              >
                {props.item.soldNumber} Học viên
              </Text>
              {checkPrice(props.item.price)}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
    width: 250,
    height: 225,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    height: 135,
    width: 250,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  starStyle: {
    width: 100,
    height: 20,
  },
  view: {
    marginLeft: 5,
  },
});

export default SectionCoursesItem;
