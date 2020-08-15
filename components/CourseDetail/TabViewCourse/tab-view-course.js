import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Modal,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ListLessons from "../../Courses/ListLessons/list_lessons";
import { AuthContext } from "../../../provider/auth-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import {
  apiCheckOwnCourse,
  apiGetFreeCourse,
} from "../../../core/services/account-service";
import { Button } from "react-native-paper";
import { LessonContext } from "../../../provider/lesson-provider";
import ListCourses from "../../Courses/ListCourses/list-courses";
import {
  getRatingAction,
} from "../../../action/course-action";
import { LanguageContext } from "../../../provider/language-provider";
import { apiGetCoursesFromCat } from "../../../core/services/course-service";

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewCourse(props) {
  const { language } = useContext(LanguageContext);
  const buyUrl = `https://itedu.me/payment/${props.data.id}`;
  const [isOwn, checkOwn] = useState();
  const [modalVisible, setModelVisible] = useState(false);
  const lessonContext = useContext(LessonContext);
  const { state } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [lessonLoading, setLessonLoading] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(true);
  const [newData, setNewData] = useState([]);
  const [ratingLoading, setRatingLoading] = useState(true);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    apiGetCoursesFromCat(props.data.categoryIds)
    .then((respone) => respone.json())
    .then((res) => setData(res.payload.rows))
    .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading === false) {
      const temp = data.filter((item) => item.id !== props.data.id);
      setNewData(temp);
      setFilter(false);
    }
  }, [loading]);

  var price;

  if (props.data.price !== undefined) {
    price = props.data.price;
  } else {
    price = props.item.coursePrice;
  }

  useEffect(() => {
    setLessonLoading(true);
    apiCheckOwnCourse(state.token, props.data.id)
      .then((response) => response.json())
      .then((res) => {
        checkOwn(res.payload.isUserOwnCourse);
      })
      .finally(() => setLessonLoading(false));
  }, [isOwn]);

  const getFreeCourse = () => {
    apiGetFreeCourse(state.token, props.data.id)
      .catch((err) => console.log(err))
      .finally(() => {
        checkOwn(true);
        setModelVisible(false);
      });
  };

  const buyCourse = useCallback(async () => {
    await Linking.openURL(buyUrl);
  });

  const clickBuyButton = () => {
    if (price === 0) {
      setModelVisible(true);
    } else {
      buyCourse();
    }
  };

  useEffect(() => {
    lessonContext.getLesson(state.token, props.data.id);
  }, [isOwn]);

  var learnWhat = [];
  var requirement = [];
  if (props.data.learnWhat !== undefined) {
    learnWhat = props.data.learnWhat;
  }
  if (props.data.requirement !== undefined) {
    requirement = props.data.requirement;
  }
  const SecondRoute = () => (
    <View style={{ marginLeft: 10 }}>
      <Text style={{ color: theme.foreground, fontSize: 17 }}>
        {language.learn}:
      </Text>
      {learnWhat.map((item) => {
        return (
          <Text style={{ marginLeft: 10, color: theme.foreground }}>
            + {item}
          </Text>
        );
      })}
      <Text style={{ color: theme.foreground, fontSize: 17 }}>
        {language.requirment}:
      </Text>
      {requirement.map((item) => {
        return (
          <Text style={{ marginLeft: 10, color: theme.foreground }}>
            + {item}
          </Text>
        );
      })}
      <Text style={{ color: theme.foreground, fontSize: 17 }}>
        {language.moreInfo}:
      </Text>
      <Text style={{ marginLeft: 10, color: theme.foreground }}>
        {props.data.description}
      </Text>
    </View>
  );
  const FirstRoute = () => {
    return (
      <View>
        {lessonLoading ? (
          <ActivityIndicator />
        ) : isOwn ? (
          <View>
            <ListLessons navigation={props.navigation} />
          </View>
        ) : (
          <View style={{ marginLeft: 15 }}>
            <Text
              style={{
                color: theme.foreground,
                fontSize: 14,
                fontStyle: "italic",
                color: "red",
              }}
            >
              * {language.requestBuy}
            </Text>

            <Text
              style={{
                color: theme.foreground,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {price} VND
            </Text>
            <Button
              icon="cart"
              mode="contained"
              color="blue"
              style={{
                marginTop: 5,
                width: 130,
                height: 40,
                borderRadius: 5,
              }}
              onPress={clickBuyButton}
            >
              {language.buy}
            </Button>
          </View>
        )}
      </View>
    );
  };

  const ThirdRoute = () => (
    <View>
      {filter ? (
        <ActivityIndicator />
      ) : (
        <ListCourses item={newData} navigation={props.navigation} />
      )}
    </View>
  );

  const getRating = (res) => {
    if (res !== undefined) {
      setRating(res.payload.ratings.ratingList);
      setRatingLoading(false);
    }
  };

  useEffect(() => {
    getRatingAction(state.token, props.data.id, getRating);
  }, []);
  const FourthRoute = () => (
    <View>
      {ratingLoading ? (
        <ActivityIndicator />
      ) : (
        rating.map((item) => {
          return (
            <View
              style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}
            >
              <Text
                style={[
                  styles.comment,
                  { fontWeight: "bold", color: theme.foreground },
                ]}
              >
                {item.user.name}:{" "}
              </Text>
              <Text style={{ color: theme.foreground }}>{item.content}</Text>
            </View>
          );
        })
      )}
    </View>
  );

  const [routes] = useState([
    { key: "lesson", title: language.lesson },
    { key: "description", title: language.desc },
    { key: "recommend", title: language.subject },
    { key: "rating", title: language.rating },
  ]);
  const renderScene = SceneMap({
    lesson: FirstRoute,
    description: SecondRoute,
    recommend: ThirdRoute,
    rating: FourthRoute,
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
      {/* Model */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>{language.buyCofirm}</Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => setModelVisible(false)}
                style={{ marginRight: 25 }}
              >
                <Text style={styles.text}>{language.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={getFreeCourse}>
                <Text style={styles.text}>{language.ok}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Model */}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  comment: {},
});
