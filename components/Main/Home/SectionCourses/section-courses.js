import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import SectionCoursesItem from "../SectionCoursesItem/section-courses-item";
import {
  apiCourses,
  renderTopSell,
  apiTopRated,
} from "../../../../core/services/course-service";
import { ThemeContext } from "../../../../provider/theme-provider";
import { apiProcessCourses } from "../../../../core/services/account-service";
import { AuthContext } from "../../../../provider/auth-provider";

const SectionCourses = (props) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (props.title === "Top Sell") {
      renderTopSell()
        .then((response) => response.json())
        .then((data) => setData(data.payload))
        .catch((error) => console.error(error));
    } else {
      if (props.title === "Top Rate") {
        apiTopRated()
          .then((response) => response.json())
          .then((data) => setData(data.payload))
          .catch((error) => console.error(error));
      } else {
        if (props.title === "Courses Of Author") {
          setData(props.item);
        } else {
          if (props.title === "Your Courses") {
            apiProcessCourses(state.token)
              .then((response) => response.json())
              .then((data) => 
              {console.log(data);
                setData(data.payload)
            }
              )
              .catch((error) => console.error(error));
          } else {
            apiCourses(props.course_id)
              .then((response) => response.json())
              .then((data) => setData(data.payload.rows))
              .catch((error) => console.error(error));
          }
        }
      }
    }
  }, []);

  const renderListItems = (courses) => {
    if (courses.length === 0) {
      return (
        <View>
          <Image
            source={{
              uri:
                "https://images.squarespace-cdn.com/content/v1/5ba5d4bce5f7d1371dd93916/1538330115654-1V19SYVKRS6IX5P1VVG0/ke17ZwdGBToddI8pDm48kDFgITcRoterXoQdllT5ciUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcV7ZyRJyI8bwZiMJRrgPaAKqUaXS0tb9q_dTyNVba_kClt3J5x-w6oTQbPni4jzRa/coming+soon.jpg?format=1500w",
            }}
            style={styles.image}
          />
        </View>
      );
    }
    return courses.map((item) => (
      <SectionCoursesItem
        navigation={props.navigation}
        item={item}
        author={props.author}
      />
    ));
  };

  return (
    <View style={styles.view}>
      <View>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, color: theme.foreground }}
        >
          {props.title}
        </Text>
      </View>
      <ScrollView horizontal={true}>{renderListItems(data)}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 5,
    marginLeft: 17,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  image: {
    marginTop: 5,
    height: 225,
    width: 250,
  },
});

export default SectionCourses;
