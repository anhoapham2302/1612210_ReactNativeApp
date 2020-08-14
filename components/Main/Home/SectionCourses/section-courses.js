import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import SectionCoursesItem from "../SectionCoursesItem/section-courses-item";
import {
  apiCourses,
  renderTopSell,
  apiTopRated,
} from "../../../../core/services/course-service";
import { ThemeContext } from "../../../../provider/theme-provider";
import { apiProcessCourses } from "../../../../core/services/account-service";
import { AuthContext } from "../../../../provider/auth-provider";
import { getCoursesFromCatAction } from "../../../../action/course-action";
import { ImageButtonContext } from "../../../../provider/imageButton-provider";
import { LanguageContext } from "../../../../provider/language-provider";
import { languages } from "../../../../global/language";

const SectionCourses = (props) => {
  const {language} = useContext(LanguageContext);
  const {setTitle} = useContext(ImageButtonContext);
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const { state } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  
  const coursesFromCat = res => {
    if(res !== undefined)
    {
      setData(res.payload.rows);
      setLoading(false);
    }
  }

  const onPressMore = () =>{
    setTitle(props.title)
    props.navigation.navigate("ListCoursesPage", {title: props.title, com: "Any", data: data})
  }

  useEffect(() => {
    if (props.title === language.topSell) {
      setLoading(true);
      renderTopSell()
        .then((response) => response.json())
        .then((data) => setData(data.payload))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      if (props.title === language.topRate) {
        setLoading(true);
        apiTopRated()
          .then((response) => response.json())
          .then((data) => setData(data.payload))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      } else {
        if (props.title === language.courseInstructor) {
          setData(props.item);
        } else {
          if (props.title === language.yourCourse) {
            setLoading(true);
            apiProcessCourses(state.token)
              .then((response) => response.json())
              .then((data) => setData(data.payload))
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));
          } else {
            getCoursesFromCatAction([props.course_id], coursesFromCat);
          }
        }
      }
    }
  }, [isLoading]);

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
    return courses.slice(0, 5).map((item) => (
      <SectionCoursesItem
        key={item.id.toString()}
        navigation={props.navigation}
        item={item}
        author={props.author}
      />
    ));
  };

  return (
    <View style={styles.view}>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, color: theme.foreground }}
        >
          {props.title}
        </Text>
        <TouchableOpacity onPress={onPressMore}>
          <Text style = {{marginRight: 15, marginTop: 5, fontSize: 15, color: '#4DC4FF'}}>{language.more} {'>>'}</Text>
        </TouchableOpacity>
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
