import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Star from "react-native-star-view";
import { ThemeContext } from "../../../../provider/theme-provider";
import { AuthContext } from "../../../../provider/auth-provider";
import { apiGetLastWatchedLesson, apiCourseDetails } from "../../../../core/services/course-service";
import { LanguageContext } from "../../../../provider/language-provider";

const SectionCoursesItem = (props) => {
  const {language} = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const {state} = useContext(AuthContext);
  const [getLessonProcess, setGetLessonProcess] = useState(true);
  const [data, setData] = useState(null);
  const [course, setCourse] = useState(null)
  const [starCourse, setStarCourse] = useState(0);
  const [loadingStar, setLoadingStar] = useState(true);

  const [isProcessCourse, setProcessCourse] = useState(false)
  useEffect(() => {
    if (props.item.process !== undefined) {
      apiCourseDetails(props.item.id)
      .then((respone) => respone.json())
      .then((res) => {setCourse(res.payload)}
      )
      .catch((err) => console.log(err))
      .finally(() => setProcessCourse(true))
    }
  }, [])

  useEffect(() => {
    if (props.item.process !== undefined && isProcessCourse === true) {
      setLoadingStar(true);
            const star_course =   Math.round(( (course.contentPoint +
                course.formalityPoint +
                course.presentationPoint) /
              3)) 
              if(star_course < 6 && star_course > 0){
                setStarCourse(star_course);
            }else{
                if(star_course > 5){
                    setStarCourse(5);
                }else{
                    setStarCourse(0);
                }
        }
        setLoadingStar(false);
    }
  }, [isProcessCourse])
  
 const star = Math.round(( (props.item.contentPoint +
    props.item.formalityPoint +
    props.item.presentationPoint) /
  3));
  let starShow = 0;
  if(star < 6 && star > 0){
    starShow = star
  }else{
    if(star > 5){
      starShow = 5
    }else{
      starShow = 0
    }
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
          {language.free}
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
         <Image source={{ uri: course.imageUrl }} style={styles.image} />
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
             {course.title}
           </Text>
           <Text
           style={{ fontSize: 14, color: "darkgrey" }}
         >{props.item.instructorName}</Text>
           <Star
             score={
             starCourse
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
               {course.soldNumber} {language.student}
             </Text>
             {checkPrice(course.price)}
           </View>
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
              starShow
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
                {props.item.soldNumber} {language.student}
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
