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
  Alert,
  TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ListLessons from "../../Courses/ListLessons/list_lessons";
import { AuthContext } from "../../../provider/auth-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import {
  apiCheckOwnCourse,
  apiGetFreeCourse,
} from "../../../core/services/account-service";
import { Button, RadioButton } from "react-native-paper";
import { LessonContext } from "../../../provider/lesson-provider";
import ListCourses from "../../Courses/ListCourses/list-courses";
import { getRatingAction } from "../../../action/course-action";
import { LanguageContext } from "../../../provider/language-provider";
import {
  apiGetCoursesFromCat,
  apiSendRate,
} from "../../../core/services/course-service";
import Star from "react-native-star-view/lib/Star";
import { apiGetVideoData } from "../../../core/services/video-service";
import { color } from "react-native-reanimated";
import { themes } from "../../../global/theme";

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewCourse(props) {
  const { language } = useContext(LanguageContext);
  const buyUrl = `https://itedu.me/payment/${props.data.id}`;
  const [isOwn, checkOwn] = useState();
  const [modalVisible, setModelVisible] = useState(false);
  const lessonContext = useContext(LessonContext);
  const { lesson } = useContext(LessonContext);
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
  const [time, setTime] = useState(0);

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
  const [calTime, setCalTime] = useState(true);
  useEffect(() => {
    setTime(0);
    setCalTime(true);
    let i = 0;
    let leng = 0;
    let t = 0;
    lesson.data.map((lesson) => {
      leng = leng + lesson.lesson.length;
      lesson.lesson.map((lesson) => {
        i = i + 1;
        apiGetVideoData(state.token, props.data.id, lesson.id)
          .then((respone) => respone.json())
          .then((res) => {
            if (res.payload.currentTime !== null) {
              t = t + res.payload.currentTime/3600;
              setTime(t);
            }
          });
      });
    });
    if (leng === i) {
      setCalTime(false);
    }
  }, []);

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
            {calTime ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 17 }}>
                {language.timeLearn}: {Math.ceil(time * 100)/100}/{props.data.totalHours} {language.hour}
              </Text>
            )}
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
  const onShowModelRate = () => {
    setRateModelVisible(true);
  };
  useEffect(() => {
    getRatingAction(state.token, props.data.id, getRating);
  }, []);
  const FourthRoute = () => (
    <View>
      <Button
        onPress={onShowModelRate}
        icon="send"
        mode="contained"
        color="#fecd57"
        labelStyle={{ color: "#FFF" }}
        style={{
          width: 180,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "white",
          marginTop: 10,
          marginLeft: 20,
        }}
      >
        {language.sendRate}
      </Button>
      {ratingLoading ? (
        <ActivityIndicator />
      ) : (
        rating.map((item) => {
          return (
            <View>
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
                <Star score={item.averagePoint} style={styles.starStyle} />
              </View>
              <Text style={{ color: theme.foreground, marginLeft: 20 }}>
                {item.content}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
  const [comment, setComment] = useState("");
  const [formalityPoint, setFormalityPoint] = useState(1);
  const [contentPoint, setContentPoint] = useState(1);
  const [presentationPoint, setPresentationPoint] = useState(1);
  const [statusRate, setStatusRate] = useState(0);
  const [rateModelVisible, setRateModelVisible] = useState(false);

  const onPressSendRate = () => {
    setStatusRate(0);
    setRateModelVisible(false);
    apiSendRate(
      state.token,
      props.data.id,
      formalityPoint,
      contentPoint,
      presentationPoint,
      comment
    )
      .then((respone) => setStatusRate(respone.status))
      .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setRateModelVisible(false);
  };

  useEffect(() => {
    if (statusRate !== 0) {
      if (statusRate === 200) {
        Alert.alert(language.ratingSuccess);
        getRatingAction(state.token, props.data.id, getRating);
      } else {
        Alert.alert(language.ratingFail);
      }
    }
  }, [statusRate]);

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
          <View
            style={[styles.modalView, { backgroundColor: theme.background }]}
          >
            <Text style={[styles.text, {color: theme.foreground}]}>{language.buyCofirm}</Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => setModelVisible(false)}
                style={{ marginRight: 25 }}
              >
                <Text style={[styles.text, {color: theme.foreground}]}>{language.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={getFreeCourse}>
                <Text style={[styles.text, {color: theme.foreground}]}>{language.ok}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Model */}
      {/* Model */}
      <Modal animationType="fade" transparent={true} visible={rateModelVisible}>
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { backgroundColor: theme.background }]}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.foreground,
              }}
            >
              {language.sendRate}
            </Text>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 17, color: theme.foreground }}>
                {language.comment}:
              </Text>
              <TextInput
                onChangeText={(comment) => setComment(comment)}
                multiline={true}
                numberOfLines={3}
                style={{
                  borderWidth: 0.5,
                  borderColor: theme.foreground,
                  marginRight: 20,
                  fontSize: 17,
                  color: theme.foreground,
                }}
              />
              {/* Điểm hình thức */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: theme.foreground,
                    marginTop: 27,
                  }}
                >
                  {language.formalityPoint}:
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => setFormalityPoint(value)}
                  value={formalityPoint}
                >
                  <View style={{ flexDirection: "row", marginRight: 50 }}>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        1
                      </Text>
                      <RadioButton value={1} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        2
                      </Text>
                      <RadioButton value={2} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        3
                      </Text>
                      <RadioButton value={3} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        4
                      </Text>
                      <RadioButton value={4} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        5
                      </Text>
                      <RadioButton value={5} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              {/* Điểm hình thức */}
              {/* Điểm nội dung */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: theme.foreground,
                    marginTop: 27,
                  }}
                >
                  {language.contentPoint}:
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => setContentPoint(value)}
                  value={contentPoint}
                >
                  <View style={{ flexDirection: "row", marginRight: 50 }}>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        1
                      </Text>
                      <RadioButton value={1} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        2
                      </Text>
                      <RadioButton value={2} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        3
                      </Text>
                      <RadioButton value={3} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        4
                      </Text>
                      <RadioButton value={4} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        5
                      </Text>
                      <RadioButton value={5} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              {/* Điểm nội dung */}
              {/* Điểm thuyết trình */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: theme.foreground,
                    marginTop: 27,
                  }}
                >
                  {language.presentationPoint}:
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => setPresentationPoint(value)}
                  value={presentationPoint}
                >
                  <View style={{ flexDirection: "row", marginRight: 50 }}>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        1
                      </Text>
                      <RadioButton value={1} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        2
                      </Text>
                      <RadioButton value={2} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        3
                      </Text>
                      <RadioButton value={3} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        4
                      </Text>
                      <RadioButton value={4} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 17,
                          marginLeft: 10,
                        }}
                      >
                        5
                      </Text>
                      <RadioButton value={5} />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              {/* Điểm thuyết trình */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onPress={onPressSendRate}
                  icon="send"
                  mode="contained"
                  color="#fecd57"
                  labelStyle={{ color: "#FFF" }}
                  style={{
                    width: 180,
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: "white",
                    marginTop: 20,
                  }}
                >
                  {language.sendRate}
                </Button>
                <Button
                  onPress={onCancel}
                  icon="cancel"
                  mode="contained"
                  color="red"
                  labelStyle={{ color: "#FFF" }}
                  style={{
                    width: 120,
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: "white",
                    marginTop: 20,
                    marginRight: 20,
                  }}
                >
                  {language.cancel}
                </Button>
              </View>
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
  starStyle: {
    marginLeft: 5,
    width: 80,
    height: 17,
  },
  comment: {},
});
