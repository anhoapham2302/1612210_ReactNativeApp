import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function MainImage(props) {
  return (
    <View>
      <Image source={{ uri: props.data.imageUrl }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 250,
      },
});
