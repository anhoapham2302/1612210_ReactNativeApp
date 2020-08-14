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
import { AuthContext } from "../../../provider/auth-provider";
import { HistorySearchContext } from "../../../provider/history-search-provider";
import { LanguageContext } from "../../../provider/language-provider";

export default function SearchBarView(props) {
  const {language} = useContext(LanguageContext);
  const [text, setText] = useState("");
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const searchContext = useContext(SearchContext);
  const { historySearch } = useContext(HistorySearchContext);
  const historySearchContext  = useContext(HistorySearchContext);

  const createAlert = () => {
    Alert.alert("Text input is required.");
  };
  return (
    <View style={{ flexDirection: "row", marginTop: 70, marginHorizontal: 15 }}>
      <TextInput
        style={[styles.search, { color: theme.foreground, borderBottomColor: theme.foreground}]}
        onChangeText={(input_text) => {
          setText(input_text);
          if (input_text === "") {
            historySearchContext.historySearchAction("COMPLETE_SEARCH")
          }
        }}
        defaultValue={historySearch.text}
        placeholder={language.searchInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          {
            if (text === "") {
              createAlert();
            } else {
              searchContext.getCoursesSearch(state.token, text, 2, 0, 1);
              historySearchContext.historySearchAction("SELECT_RESULT", text)
            }
          }
        }}
      >
        <Text style={[styles.text, { color: theme.foreground }]}>{language.search}</Text>
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
    width: 100,
    height: 35,
  },
  text: {
    fontSize: 17,
    paddingTop: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
});
