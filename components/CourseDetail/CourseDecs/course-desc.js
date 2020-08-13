import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Star from "react-native-star-view";
import { ThemeContext } from '../../../provider/theme-provider';

export default function CourseDesc(props) {
    const {theme} = useContext(ThemeContext);
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
                  (props.data.contentPoint +
                    props.data.formalityPoint +
                    props.data.presentationPoint) /
                  3
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
