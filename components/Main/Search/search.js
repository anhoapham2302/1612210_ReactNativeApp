import React, { useContext } from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";

import SearchResult from "./search-result";
import SearchBarView from "./search-bar";
import { ThemeContext } from "../../../provider/theme-provider";
import HistorySearch from "./history-search";
import { HistorySearchContext } from "../../../provider/history-search-provider";

const windowHeight = Dimensions.get("window").height;

const Search = (props) => {
  const { historySearch } = useContext(HistorySearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={{ backgroundColor: theme.background, height: windowHeight }}>
      <SearchBarView navigation={props.navigation} />
      {historySearch.visible ? (
        <HistorySearch navigation={props.navigation} />
      ) : (
        <SearchResult navigation={props.navigation} />
      )}
    </ScrollView>
  );
};

export default Search;
