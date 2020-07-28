// Đây là component cho course details

import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  ListView,
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Star from "react-native-star-view";
import Colors from "../../../global/color";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../../provider/auth-provider";
import { FavContext } from "../../../provider/favorite-provider";
import { BookmarkContext } from "../../../provider/bookmark-provider";
import courses from "../../../global/courses";
import { apiCourseDetails} from "../../../core/services/course-service";
import { CoursesContext } from "../../../provider/course-provider";
import {
  apiAddFavoriteCourse,
  apiCheckOwnCourse,
  apiChecLikeCourse,
} from "../../../core/services/account-service";
import { TabView, SceneMap } from "react-native-tab-view";
import { color } from "react-native-reanimated";
import { ThemeContext } from "../../../provider/theme-provider";
import ListLessons from "../../Courses/ListLessons/list_lessons";
import { LessonContext } from "../../../provider/lesson-provider";
import ListCourses from "../../Courses/ListCourses/list-courses";
import { useIsFocused } from "@react-navigation/native";
import { apiAuthorDetail } from "../../../core/services/author-service";

const initialLayout = { width: Dimensions.get("window").width };

const VideoDescription = (props) => {
  const { state } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { courses } = useContext(CoursesContext);
  const coursesContext = useContext(CoursesContext);
  const [data, setData] = useState([]);
  const [isOwn, checkOwn] = useState();
  const [isLoading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const lessonContext = useContext(LessonContext)
  const [click, setClick] = useState(0)
  useEffect(() => {
    apiCourseDetails(props.item.id)
      .then((response) => response.json())
      .then((data) => {
        setData(data.payload);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    apiCheckOwnCourse(state.token, props.item.id)
      .then((response) => response.json())
      .then((res) => {
        checkOwn(res.payload.isUserOwnCourse);
      });
  }, [isOwn]);

  useEffect(() => {
    lessonContext.getLesson(state.token, props.item.id)
  }, []);
  const clickFavButton = () => {
    apiAddFavoriteCourse(state.token, data.id).catch((error) =>
      console.log(error))
      .finally(setClick(click+1))
  };
  useEffect(() => {
    coursesContext.renderFavoriteCourses(state.token);
  }, [click])

  const renderFavButton = () => {
    return (
      <TouchableOpacity
        style={{
          width: 130,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "red",
        }}
        onPress={clickFavButton}
      >
        <Icon.Button name="heart" backgroundColor="#fff" color="red">
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "red" }}>
            Favorite
          </Text>
        </Icon.Button>
      </TouchableOpacity>
    );
  };

  const renderUnFavButton = () => {
    return (
      <TouchableOpacity
        style={{
          width: 130,
          borderWidth: 0,
          borderRadius: 5,
          borderColor: "red",
        }}
        onPress={clickFavButton}
      >
        <Icon.Button name="heart" backgroundColor="red" color="#fff">
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "#fff" }}>
            Favorited
          </Text>
        </Icon.Button>
      </TouchableOpacity>
    );
  };

  const checkFav = () => {
    for (let i = 0; i < courses.data.length; i++) {
      if (courses.data[i].id === data.id) {
        return renderUnFavButton();
      }
    }
    return renderFavButton();
  };
  const learnWhat = data.learnWhat;
  const requirement = data.requirement;
  const SecondRoute = () => (
    <ScrollView style = {{marginLeft: 10}}>
      <Text style={{ color: theme.foreground, fontSize: 17}}>Các bạn sẽ được học:</Text>
      {learnWhat.map((item) => {
        return (
          <Text style={{ marginLeft: 10, color: theme.foreground }}>
            + {item}
          </Text>
        );
      })}
      <Text style={{ color: theme.foreground, fontSize: 17 }}>Yêu cầu:</Text>
      {requirement.map((item) => {
        return (
          <Text style={{ marginLeft: 10, color: theme.foreground }}>
            + {item}
          </Text>
        );
      })}
      <Text style={{ color: theme.foreground , fontSize: 17}}>Thông tin thêm:</Text>
      <Text style={{ marginLeft: 10, color: theme.foreground }}>
        {data.description}
      </Text>
    </ScrollView>
  );
  const FirstRoute = () => {
    if(isOwn === true)
    {
      return(<ScrollView>
         <ListLessons navigation={props.navigation}/>
      </ScrollView>)
      
    }
    return( <ScrollView style = {{marginLeft: 15}}>
            <Text style={{ color: theme.foreground, fontSize: 14, fontStyle: 'italic', color: 'red'}}>* Bạn phải mua khóa học mới có thể xem được bài học.</Text>

      <Text style={{ color: theme.foreground, fontSize: 20, fontWeight: 'bold'}}>Giá: {props.item.price} VND</Text>
      <TouchableOpacity   style={{
          marginTop: 5,
          width: 120,
          height: 40,
          borderRadius: 5,
          backgroundColor: "#4DC4FF"
        }}>
      <Text style={{ color: 'white', fontSize: 20, paddingLeft: 15, paddingTop: 5}}>Mua ngay</Text>
      </TouchableOpacity>
    </ScrollView>)
   
  };

  // const ThirdRoute = () => (
  //   <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
  // );

  const [routes] = useState([
    { key: "lesson", title: "Bài học" },
    { key: "description", title: "Mô tả" },
    // { key: "evaluate", title: "Đánh giá" },
  ]);
  const renderScene = SceneMap({
    lesson: FirstRoute,
    description: SecondRoute,
    // evaluate: ThirdRoute,
  });


  return (
    <View style = {{marginTop: 30}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Image source={{ uri: data.imageUrl }} style={styles.image} />
          <View style={{ marginHorizontal: 17 }}>
            <Text style={[styles.title, { color: theme.foreground }]}>
              {data.title}
            </Text>
            <View style={styles.view}>
              <Text
                style={{ color: "darkgrey" }}
              >{`${data.videoNumber} video(s) . ${data.totalHours} hours`}</Text>
              <Star
                score={
                  (data.contentPoint +
                    data.formalityPoint +
                    data.presentationPoint) /
                  3
                }
                style={styles.starStyle}
              />
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              {checkFav()}
            </View>
          </View>
          <TabView
            style={{ marginTop: 15 }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      )}
    </View>
  );
};

const styles = {
  scene: {
    flex: 1,
  },
  view: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
  },
  author: {
    height: 35,
    width: 200,
    backgroundColor: Colors.backgroundItem,
    borderRadius: 10,
    marginTop: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 17,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
  starStyle: {
    marginLeft: 5,
    width: 80,
    height: 17,
  },
};

export default VideoDescription;
