// Đây là component cho course details

import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { Button } from "react-native-paper";
import Star from "react-native-star-view";
import Colors from "../../../global/color";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../../provider/auth-provider";
import { apiCourseDetails } from "../../../core/services/course-service";
import { CoursesContext } from "../../../provider/course-provider";
import {
  apiAddFavoriteCourse,
  apiCheckOwnCourse,
  apiGetFreeCourse,
} from "../../../core/services/account-service";
import { TabView, SceneMap } from "react-native-tab-view";
import { ThemeContext } from "../../../provider/theme-provider";
import ListLessons from "../../Courses/ListLessons/list_lessons";
import { LessonContext } from "../../../provider/lesson-provider";

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
  const lessonContext = useContext(LessonContext);
  const [click, setClick] = useState(0);
  const [statusBuy, setStatusBuy] = useState();
  const [modalVisible, setModelVisible] = useState(false);
  const buyUrl = `https://itedu.me/payment/${props.item.id}`;
  const shareUrl = `https://itedu.me/course-detail/${props.item.id}`;
  var price;

  if (props.item.price !== undefined) {
    price = props.item.price;
  } else {
    price = props.item.coursePrice;
  }
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
    lessonContext.getLesson(state.token, props.item.id);
  }, []);
  const clickFavButton = () => {
    apiAddFavoriteCourse(state.token, data.id)
      .catch((error) => console.log(error))
      .finally(setClick(click + 1));
  };
  useEffect(() => {
    coursesContext.renderFavoriteCourses(state.token);
  }, [click]);

  const getFreeCourse = () => {
    apiGetFreeCourse(state.token, props.item.id)
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

  const onShare = async () => {
    Share.share(
      {
        message:
          "Cùng tham gia khóa học: " +
          shareUrl,
        url:
          shareUrl,
        title: "Chia sẻ khóa học",
        
      },
      {
        // Android only:
        dialogTitle:
          "Cùng tham gia khóa học: " +
          shareUrl,
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
      }
    );
  };

  const renderFavButton = () => {
    return (
      <Button
        icon="heart"
        mode="outlined"
        color="red"
        style={{
          width: 130,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "red",
        }}
        onPress={clickFavButton}
      >
        Yêu thích
      </Button>
    );
  };

  const renderUnFavButton = () => {
    return (
      <Button
        icon="heart"
        mode="contained"
        color="red"
        style={{
          width: 130,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "white",
        }}
        onPress={clickFavButton}
      >
        Đã thích
      </Button>
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

  var learnWhat = [];
  var requirement = [];
  if (data.learnWhat !== undefined) {
    learnWhat = data.learnWhat;
  }
  if (data.requirement !== undefined) {
    requirement = data.requirement;
  }
  const SecondRoute = () => (
    <ScrollView style={{ marginLeft: 10 }}>
      <Text style={{ color: theme.foreground, fontSize: 17 }}>
        Các bạn sẽ được học:
      </Text>
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
      <Text style={{ color: theme.foreground, fontSize: 17 }}>
        Thông tin thêm:
      </Text>
      <Text style={{ marginLeft: 10, color: theme.foreground }}>
        {data.description}
      </Text>
    </ScrollView>
  );
  const FirstRoute = () => {
    if (isOwn === true) {
      return (
        <ScrollView>
          <ListLessons navigation={props.navigation} />
        </ScrollView>
      );
    }
    return (
      <ScrollView style={{ marginLeft: 15 }}>
        <Text
          style={{
            color: theme.foreground,
            fontSize: 14,
            fontStyle: "italic",
            color: "red",
          }}
        >
          * Bạn phải mua khóa học mới có thể xem được bài học.
        </Text>

        <Text
          style={{ color: theme.foreground, fontSize: 20, fontWeight: "bold" }}
        >
          Giá: {price} VND
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
          Mua ngay
        </Button>
      </ScrollView>
    );
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
    <View style={{ marginTop: 30 }}>
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
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              {checkFav()}
              <Button
                icon="share"
                mode="contained"
                color="#3498DB"
                labelStyle={{color: '#FFF'}}
                style={{
                  width: 130,
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: "white",
                }}
                onPress={onShare}
              >
                Chia sẻ
              </Button>
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
      {/* Model */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Bạn muốn tham gia khóa học?</Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => setModelVisible(false)}
                style={{ marginRight: 25 }}
              >
                <Text style={styles.text}>Không</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={getFreeCourse}>
                <Text style={styles.text}>Có</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Model */}
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
};

export default VideoDescription;
