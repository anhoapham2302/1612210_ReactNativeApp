import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { AuthContext } from "../../provider/auth-provider";
import VideoPlayer from "./VideoPlayer/video-player";
import { apiGetVideoData } from "../../core/services/video-service";
import VideoInfomation from "./VideoInfomation/video-infomation";
import { ThemeContext } from "../../provider/theme-provider";

export default function VideoMain(props) {
  const { state } = useContext(AuthContext);
  const {theme} = useContext(ThemeContext)
  const ele = props.route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    apiGetVideoData(state.token, ele.course_id, ele.item.id)
      .then((respone) => respone.json())
      .then((res) => {
        setData(res.payload);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  let video_id = [];
  if (isLoading === false) {
    video_id = data.videoUrl.split("https://youtube.com/embed/", 2);
  }
  return (
    <ScrollView style = {{backgroundColor: theme.background}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <VideoPlayer
            video_id={video_id}
            navigation={props.navigation}
          />
          <VideoInfomation
            video_id={video_id}
            item={ele.item}
            navigation={props.navigation}
          />
        </View>
      )}
    </ScrollView>
  );
}
