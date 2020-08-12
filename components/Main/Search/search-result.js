import React, { useContext, useState } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { HistorySearchContext } from "../../../provider/history-search-provider";
import { AuthContext } from "../../../provider/auth-provider";

export default function SearchResult(props) {
  const { search_results } = useContext(SearchContext);
  const {historySearch} = useContext(HistorySearchContext);
  const searchContext = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  const {state} = useContext(AuthContext);
  const pageCount = Math.ceil(search_results.count/2)
  const [page, setPage] = useState(1);
  const onNextButton = () => {
    searchContext.getCoursesSearch(state.token, historySearch.text, 2, 2*page);
    setPage(page+1)
  }
  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {(search_results.count === 0) ? (<Text style = {[styles.text, {color: theme.foreground}]}>Không tìm thấy kết quả.</Text>) : 
      search_results.isFirst ? (
        <View></View>
      ) : search_results.isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
                  <ListCourses item={search_results.data} navigation={props.navigation} />
            <TouchableOpacity >
              <Text>back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNextButton}>
              <Text>next</Text>
            </TouchableOpacity>

        </View>
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
