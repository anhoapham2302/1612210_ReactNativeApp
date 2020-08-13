import React, { useEffect, useContext, useState, useRef } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { AuthContext } from "../../../provider/auth-provider";
import { apiGetVideoData } from "../../../core/services/video-service";
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from "@react-navigation/native";
import { apiUpdateCurrentTime } from "../../../core/services/course-service";

const VideoPlayer = (props) => {
  const {state} = useContext(AuthContext);
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [event, setEvent] = useState(null);
  const isFocused = useIsFocused();

  console.log(isFocused);

  const currentTime = Math.floor(props.current)*1000;
  useEffect(() => {
    if (isFocused === false) {
      if (props.video_id[0] === "") {
        setPlaying(false);
        playerRef.current.getCurrentTime().then((data) => {
          apiUpdateCurrentTime(state.token, props.lesson_id, data)
        });
      } else {
        setPlaying(false);
        videoRef.current.getStatusAsync().then((data) => {
          apiUpdateCurrentTime(state.token, props.lesson_id, (data.positionMillis)/1000)
        })

      }
    }
  }, [isFocused]);
  return (
    <View style={{ marginTop: 30 }}>
      {props.video_id[0] === "" ? (
        <YoutubePlayer
          ref={playerRef}
          height={250}
          width={"100%"}
          videoId={props.video_id[1]}
          play={playing}
          
          // onChangeState={(event) => console.log(event)}
          // onReady={() => console.log("ready")}
          // onError={(e) => console.log(e)}
          // onPlaybackQualityChange={(q) => console.log(q)}
          
          volume={50}
          playbackRate={1}
          initialPlayerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true,
            start: Math.floor(props.current)
          }}
        />
      ) : (
        <Video
          ref={videoRef}
          source={{
            uri: props.video_id[0],
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          positionMillis={currentTime}
          resizeMode="cover"
          shouldPlay={playing}
          isLooping
          useNativeControls
          style={{ width: "100%", height: 250, borderBottomWidth: 0.5 }}
        />
      )}
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
