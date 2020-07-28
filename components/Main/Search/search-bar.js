import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SearchContext } from "../../../provider/search-provider";
import { ThemeContext } from "../../../provider/theme-provider";

export default function SearchBarView(props) {
  const [text, setText] = useState("");
  const { theme } = useContext(ThemeContext);
  const searchContext = useContext(SearchContext);
  const createAlert = () => {
    Alert.alert("Text input is required.");
  };
  return (
    <View style={{ flexDirection: "row", marginTop: 70, marginHorizontal: 17 }}>
      <TextInput
        style={[styles.search, { color: theme.foreground }]}
        onChangeText={(input_text) => setText(input_text)}
        placeholder="Search input..."
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          {
            if (text === "") {
              createAlert();
            } else {
              searchContext.getCoursesSearch(text);
            }
          }
        }}
      >
        <Text style={[styles.text, { color: theme.foreground }]}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    borderBottomWidth: 0.5,
    fontSize: 17,
  },
  button: {
    width: 70,
    height: 35,
  },
  text: {
    fontSize: 17,
    paddingTop: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
});
