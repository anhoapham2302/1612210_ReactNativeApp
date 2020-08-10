import React, { useContext } from "react";
import { View, Dimensions } from "react-native";

import SearchResult from "./search-result";
import SearchBarView from "./search-bar";
import { ThemeContext } from "../../../provider/theme-provider";
import HistorySearch from "./history-search";
import { HistorySearchContext } from "../../../provider/history-search-provider";

const windowHeight = Dimensions.get("window").height;

const Search = (props) => {
  const { visible } = useContext(HistorySearchContext);
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ backgroundColor: theme.background, height: windowHeight }}>
      <SearchBarView navigation={props.navigation} />
      {visible ? (
        <HistorySearch navigation={props.navigation} />
      ) : (
        <SearchResult navigation={props.navigation} />
      )}
    </View>
  );
};

export default Search;
