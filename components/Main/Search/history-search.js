import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../../../provider/auth-provider";
import { useIsFocused } from "@react-navigation/native";
import { apiGetHistorySearch, apiDelHistorySearch } from "../../../core/services/search-service";
import { ActivityIndicator } from "react-native-paper";
import { SearchContext } from "../../../provider/search-provider";
import { HistorySearchContext } from "../../../provider/history-search-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";
import { SearchInstructorsContext } from "../../../provider/search-instructors-provider";

export default function HistorySearch() {
  const {language} = useContext(LanguageContext);
  const isFocus = useIsFocused();
  const {theme} = useContext(ThemeContext)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(AuthContext);
  const searchContext = useContext(SearchContext);
  const searchIntructorsContext = useContext(SearchInstructorsContext);
  const [item, setItem] = useState(null);
  const historySearchContext = useContext(HistorySearchContext);

  useEffect(() => {
    if (isFocus === true) {
      apiGetHistorySearch(state.token)
        .then((response) => response.json())
        .then((res) => setData(res.payload.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [isFocus]);

  useEffect(() => {
    if (item !== null) {
      searchContext.getCoursesSearch(state.token, item, 2, 0, 1);
      searchIntructorsContext.getInstructorsSearch(state.token, item, 2, 0, 1)
      historySearchContext.historySearchAction("SELECT_RESULT", item)
    }
  }, [item]);

  return (
    <View style={[styles.view]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={{ fontSize: 20, color: theme.foreground}}>{language.historySearch}</Text>
          {data.map((item) => {
            return (
              <View style={styles.result}>
                <TouchableOpacity onPress={() => setItem(item.content)}>
                  <Text style={[styles.item, { color: "#62DDBD" }]}>
                    {item.content}
                  </Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity onPress={() => {
                    const newData = data.filter(itemDel => itemDel.content !== item.content);
                    setData(newData);
                    apiDelHistorySearch(state.token, item.id);
                  }}>
                    <Text style={[styles.item, { color: "red" }]}>{language.delete}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginLeft: 15,
  },
  result: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 50,
    paddingTop: 5,
  },
  item: {
    fontSize: 15,
  },
});
