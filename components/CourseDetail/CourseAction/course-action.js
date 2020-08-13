import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Share } from 'react-native'
import { Button } from "react-native-paper";
import { apiAddFavoriteCourse } from '../../../core/services/account-service';
import { AuthContext } from '../../../provider/auth-provider';
import { CoursesContext } from '../../../provider/course-provider';

export default function CourseAction(props) {
    const {state} = useContext(AuthContext);
    const coursesContext = useContext(CoursesContext);
    const { courses } = useContext(CoursesContext);
    const [click, setClick] = useState(0);
    const [loadingButton, setLoadingButton] = useState(false);
    const shareUrl = `https://itedu.me/course-detail/${props.data.id}`;

    const clickFavButton = () => {
        setLoadingButton(true);
        apiAddFavoriteCourse(state.token, props.data.id)
          .catch((error) => console.log(error))
          .finally(setClick(click + 1));
      };

      useEffect(() => {
        coursesContext.renderFavoriteCourses(state.token);
        setLoadingButton(false);
      }, [click]);

      const renderFavButton = () => {
        return (
          <Button
            loading={loadingButton}
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
          loading={loadingButton}
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
          if (courses.data[i].id === props.data.id) {
            return renderUnFavButton();
          }
        }
        return renderFavButton();
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
    return (
        <View style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
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
    )
}

const styles = StyleSheet.create({})
