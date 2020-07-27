import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SearchContext } from "../../../provider/search-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import ListCourses from "../../Courses/ListCourses/list-courses";

export default function SearchResult(props) {
  const { search_results } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
console.log(search_results.count);
  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {(search_results.count === 0) ? (<Text style = {[styles.text, {color: theme.foreground}]}>Không tìm thấy kết quả.</Text>) : 
      search_results.isFirst ? (
        <View></View>
      ) : search_results.isLoading ? (
        <ActivityIndicator />
      ) : (
        <ListCourses item={search_results.data} navigation={props.navigation} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        paddingTop: 5,
        marginLeft: 15,
      },
});
