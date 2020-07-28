import React, { useEffect, useContext, useState, useRef } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { AuthContext } from "../../../provider/auth-provider";
import { apiGetVideoData } from "../../../core/services/video-service";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlayer = (props) => {
  const { state } = useContext(AuthContext);
  const ele = props.route.params;
  const [data, setData] = useState([]);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
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
    <View style = {{marginTop: 30}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (video_id[0] === "") ? (<YoutubePlayer
        ref={playerRef}
        height={250}
        width={"100%"}
        videoId={video_id[1]}
        play={playing}
        onChangeState={(event) => console.log(event)}
        onReady={() => console.log("ready")}
        onError={(e) => console.log(e)}
        onPlaybackQualityChange={(q) => console.log(q)}
        volume={50}
        playbackRate={1}
        initialPlayerParams={{
          cc_lang_pref: "us",
          showClosedCaptions: true,
        }}
      />) : (<Video
        source={{
          uri:
            video_id[0]
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        useNativeControls
        style={{ width: "100%", height: 250, borderBottomWidth: 0.5 }}
      />)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
});

export default VideoPlayer;
