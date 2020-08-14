import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Star from "react-native-star-view";
import { ThemeContext } from '../../../provider/theme-provider';

export default function CourseDesc(props) {
    const {theme} = useContext(ThemeContext);
    let star = 0;
    if(Math.ceil((props.data.contentPoint +
      props.data.formalityPoint +
      props.data.presentationPoint) /
    3) < 6){
      star = Math.ceil((props.data.contentPoint +
        props.data.formalityPoint +
        props.data.presentationPoint) /
      3);
    }else{
      star = 5;
    }
    return (
          <View style={{ marginHorizontal: 17 }}>
            <Text style={[styles.title, { color: theme.foreground }]}>
              {props.data.title}
            </Text>
            <View style={styles.view}>
              <Text
                style={{ color: "darkgrey" }}
              >{`${props.data.videoNumber} video(s) . ${props.data.totalHours} hours`}</Text>
              <Star
                score={
                  star
                }
                style={styles.starStyle}
              />
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
      },
      title: {
        fontSize: 24,
      },
      starStyle: {
        marginLeft: 5,
        width: 80,
        height: 17,
      },
})
