import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Video } from 'expo-av';


const VideoPlayer = (props) => {
    return (
        <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay ={false}
        isLooping ={false}
        useNativeControls
    style={{ width: '100%', height: 250, borderBottomWidth:0.5 }}
/>
    )
}

const styles = StyleSheet.create({})

export default VideoPlayer

