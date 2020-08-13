import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { IconButton } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { SearchContext } from "../../../provider/search-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import ListCourses from "../../Courses/ListCourses/list-courses";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HistorySearchContext } from "../../../provider/history-search-provider";
import { AuthContext } from "../../../provider/auth-provider";

const initialLayout = { width: Dimensions.get("window").width };

export default function SearchResult(props) {
  const { search_results } = useContext(SearchContext);
  const { historySearch } = useContext(HistorySearchContext);
  const searchContext = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const pageCount = Math.ceil(search_results.coursesCount / 2);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [buttonPrevDisable, setButtonPrevDisable] = useState(false);
  const [buttonNextDisable, setButtonNextDisable] = useState(false);

  useEffect(() => {
    if(search_results.coursesPage === 1)
    {
      setPage(1);
    }
  }, [search_results.coursesPage])
  useEffect(() => {
    if(page === 1){
      setButtonPrevDisable(true);
    }else{
      setButtonPrevDisable(false);
    }

    if(page === pageCount){
      setButtonNextDisable(true);
    }else{
      setButtonNextDisable(false);
    }
  }, [page])

  const onNextButton = () => {
    if (page < pageCount) {
      searchContext.getCoursesSearch(
        state.token,
        historySearch.text,
        2,
        2 * page,
        page + 1
      );
      setPage(page + 1);
    }
  };

  const onPrevButton = () => {
    if (page > 1) {
      searchContext.getCoursesSearch(
        state.token,
        historySearch.text,
        2,
        2 * page - 4,
        page - 1
      );
      setPage(page - 1);
    }
  };

  const FirstRoute = () => (
    <ScrollView style={{ backgroundColor: theme.background}}>
    {search_results.coursesCount === 0 ? (
      <Text style={[styles.text, { color: theme.foreground }]}>
        Không tìm thấy kết quả.
      </Text>
    ) : search_results.isFirst ? (
      <View></View>
    ) : search_results.isLoading ? (
      <ActivityIndicator />
    ) : (
      <View>
        <ListCourses
          item={search_results.courses}
          navigation={props.navigation}
        />
        <View style={styles.pagination}>
          <IconButton
            icon='chevron-left'
            color={theme.foreground}
            size={25}
            onPress={onPrevButton}
            disabled={buttonPrevDisable}
          />
          <Text style = {[styles.page, {color: theme.foreground}]}>{page}</Text>
          <IconButton
            icon='chevron-right'
            color={theme.foreground}
            size={25}
            onPress={onNextButton}
            disabled={buttonNextDisable}
          />
        </View>
      </View>
    )}
  </ScrollView>
 
  );

  const SecondRoute = () => (
  //   <ScrollView style={{ backgroundColor: theme.background}}>
  //   {search_results.instructorsCount === 0 ? (
  //     <Text style={[styles.text, { color: theme.foreground }]}>
  //       Không tìm thấy kết quả.
  //     </Text>
  //   ) : search_results.isFirst ? (
  //     <View></View>
  //   ) : search_results.isLoading ? (
  //     <ActivityIndicator />
  //   ) : (
  //     <View>
  //       <ListCourses
  //         item={search_results.instructors}
  //         navigation={props.navigation}
  //       />
  //       <View style={styles.pagination}>
  //         <IconButton
  //           icon='chevron-left'
  //           color={theme.foreground}
  //           size={25}
  //           onPress={onPrevButton}
  //           disabled={buttonPrevDisable}
  //         />
  //         <Text style = {[styles.page, {color: theme.foreground}]}>{page}</Text>
  //         <IconButton
  //           icon='chevron-right'
  //           color={theme.foreground}
  //           size={25}
  //           onPress={onNextButton}
  //           disabled={buttonNextDisable}
  //         />
  //       </View>
  //     </View>
  //   )}
  // </ScrollView>
  <View></View>
  );
    

  const [routes] = useState([
    { key: "courses", title: "Khóa học" },
    { key: "instructors", title: "Giảng viên" },
  ]);
  const renderScene = SceneMap({
    courses: FirstRoute,
    instructors: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "red" }}
      style={{ backgroundColor: theme.background, borderColor: "red" }}
      labelStyle={{ color: "red" }}
    />
  );
  return (
    <View style = {{flex: 1}}>
    <TabView
      style={{ marginTop: 5}}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      // renderTabBar={renderTabBar}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    paddingTop: 5,
    marginLeft: 15,
  },
  pagination: {
    flexDirection: "row",
    marginLeft: 5,
  },
  page: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 17
  }
});
