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
import AuthorListSearch from "../../Authors/AuthorListSearch/author-list-search";
import { LanguageContext } from "../../../provider/language-provider";
import { SearchInstructorsContext } from "../../../provider/search-instructors-provider";

const initialLayout = { width: Dimensions.get("window").width };

export default function SearchResult(props) {
  const { language } = useContext(LanguageContext);
  const { search_results } = useContext(SearchContext);
  const { historySearch } = useContext(HistorySearchContext);
  const { search_instructors_results } = useContext(SearchInstructorsContext);
  const searchInstructorsContext = useContext(SearchInstructorsContext);
  const searchContext = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const pageCount = Math.ceil(search_results.coursesCount / 2);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [buttonPrevDisable, setButtonPrevDisable] = useState(false);
  const [buttonNextDisable, setButtonNextDisable] = useState(false);
  const instructorsPageCount = Math.ceil(
    search_instructors_results.instructorsCount / 2
  );
  const [pageInstructors, setPageInstructors] = useState(1);
  const [buttonInsPrevDisable, setButtonInsPrevDisable] = useState(false);
  const [buttonInsNextDisable, setButtonInsNextDisable] = useState(false);

  useEffect(() => {
    if (search_results.coursesPage === 1) {
      setPage(1);
    }
  }, [search_results.coursesPage]);

  useEffect(() => {
    if (search_instructors_results.instructorsPage === 1) {
      setPageInstructors(1);
    }
  }, [search_instructors_results.instructorsPage]);

  useEffect(() => {
    if (page === 1) {
      setButtonPrevDisable(true);
    } else {
      setButtonPrevDisable(false);
    }
    if (page === pageCount || pageCount === 1) {
      setButtonNextDisable(true);
    } else {
      setButtonNextDisable(false);
    }
  }, [page]);

  useEffect(() => {
    if (pageInstructors === 1) {
      setButtonInsPrevDisable(true);
    } else {
      setButtonInsPrevDisable(false);
    }
    if (
      pageInstructors === instructorsPageCount ||
      instructorsPageCount === 1
    ) {
      setButtonInsNextDisable(true);
    } else {
      setButtonInsNextDisable(false);
    }
  }, [pageInstructors]);

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

  const onInsNextButton = () => {
    if (pageInstructors < instructorsPageCount) {
      searchInstructorsContext.getInstructorsSearch(
        state.token,
        historySearch.text,
        2,
        pageInstructors * 2,
        pageInstructors + 1
      );
      setPageInstructors(pageInstructors + 1);
    }
  };

  const onInsPrevButton = () => {
    if (pageInstructors > 1) {
      searchInstructorsContext.getInstructorsSearch(
        state.token,
        historySearch.text,
        2,
        2 * pageInstructors - 4,
        pageInstructors - 1
      );
      setPageInstructors(pageInstructors - 1);
    }
  };

  const CourseRoute = () => (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ marginLeft: 15, marginTop: 5, color: "red" }}>
        {language.searchResult} '{historySearch.text}'
      </Text>
      {search_results.coursesCount === 0 ? (
        <Text style={[styles.text, { color: theme.foreground }]}>
          {language.emptySearch}
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
            {pageCount === 0 ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.pagination}>
                <IconButton
                  icon="chevron-left"
                  color={theme.foreground}
                  size={25}
                  onPress={onPrevButton}
                  disabled={buttonPrevDisable}
                />
                <Text style={[styles.page, { color: theme.foreground }]}>
                  {page}
                </Text>
                <IconButton
                  icon="chevron-right"
                  color={theme.foreground}
                  size={25}
                  onPress={onNextButton}
                  disabled={buttonNextDisable}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );

  const InstructorRoute = () => (
    <View>
      <Text style={{ marginLeft: 15, marginTop: 5, color: "red" }}>
        {language.searchResult} '{historySearch.text}'
      </Text>
      {search_instructors_results.instructorsCount === 0 ? (
        <Text style={[styles.text, { color: theme.foreground }]}>
          {language.emptySearch}
        </Text>
      ) : (
        <View>
          <AuthorListSearch navigation={props.navigation} />
          <View style={styles.pagination}>
            {instructorsPageCount === 0 ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.pagination}>
                <IconButton
                  icon="chevron-left"
                  color={theme.foreground}
                  size={25}
                  onPress={onInsPrevButton}
                  disabled={buttonInsPrevDisable}
                />
                <Text style={[styles.page, { color: theme.foreground }]}>
                  {pageInstructors}
                </Text>
                <IconButton
                  icon="chevron-right"
                  color={theme.foreground}
                  size={25}
                  onPress={onInsNextButton}
                  disabled={buttonInsNextDisable}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );

  const AllRoute = () => (
    <View>
      <Text style={{ marginLeft: 15, marginTop: 5, color: "red" }}>
        {language.searchResult} '{historySearch.text}'
      </Text>
      <Text
              style={{
                color: theme.foreground,
                fontSize: 20,
                paddingLeft: 15,
                marginTop: 5,
                width: "100%",
              }}
            >
              {language.course}
            </Text>
      <View style={{ backgroundColor: theme.background, marginBottom: 15 }}>
        {search_results.coursesCount === 0 ? (
          <Text style={[styles.text, { color: theme.foreground }]}>
            {language.emptySearch}
          </Text>
        ) : search_results.isFirst ? (
            <Text></Text>
        ) : search_results.isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <ListCourses
              item={search_results.courses}
              navigation={props.navigation}
            />
            <View style={styles.pagination}>
              {pageCount === 0 ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.pagination}>
                  <IconButton
                    icon="chevron-left"
                    color={theme.foreground}
                    size={25}
                    onPress={onPrevButton}
                    disabled={buttonPrevDisable}
                  />
                  <Text style={[styles.page, { color: theme.foreground }]}>
                    {page}
                  </Text>
                  <IconButton
                    icon="chevron-right"
                    color={theme.foreground}
                    size={25}
                    onPress={onNextButton}
                    disabled={buttonNextDisable}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </View>
      <View>
      <Text
              style={{
                color: theme.foreground,
                fontSize: 20,
                paddingLeft: 15,
                marginTop: 5,
                width: "100%",
              }}
            >
              {language.instructor}
            </Text>
        {search_instructors_results.instructorsCount === 0 ? (
          <Text style={[styles.text, { color: theme.foreground }]}>
            {language.emptySearch}
          </Text>
        ) : (
          <View>
        
            <AuthorListSearch navigation={props.navigation} />
            <View style={styles.pagination}>
              {instructorsPageCount === 0 ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.pagination}>
                  <IconButton
                    icon="chevron-left"
                    color={theme.foreground}
                    size={25}
                    onPress={onInsPrevButton}
                    disabled={buttonInsPrevDisable}
                  />
                  <Text style={[styles.page, { color: theme.foreground }]}>
                    {pageInstructors}
                  </Text>
                  <IconButton
                    icon="chevron-right"
                    color={theme.foreground}
                    size={25}
                    onPress={onInsNextButton}
                    disabled={buttonInsNextDisable}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const [routes] = useState([
    { key: "all", title: language.all },
    { key: "courses", title: language.course },
    { key: "instructors", title: language.instructor },
  ]);
  const renderScene = SceneMap({
    all: AllRoute,
    courses: CourseRoute,
    instructors: InstructorRoute,
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
    <View style={{ flex: 1 }}>
      <TabView
        style={{ marginTop: 5 }}
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
    fontWeight: "bold",
    fontSize: 17,
  },
});
