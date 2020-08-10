import React, { useContext, useState, useEffect, useReducer } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
} from "react-native";
import Home from "./components/Main/Home/home";
import Browse from "./components/Main/Browse/browse";
import Search from "./components/Main/Search/search";
import ListCourses from "./components/Courses/ListCourses/list-courses";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SectionCourses from "./components/Main/Home/SectionCourses/section-courses";
import VideoPlayer from "./components/CourseDetail/VideoPlayer/video-player";
import CourseDetail from "./components/CourseDetail/course-detail";
import Login from "./components/Authentication/Login/login";
import Register from "./components/Authentication/Register/register";
import ForgotPassword from "./components/Authentication/ForgotPassword/forgot-password";
import Downloads from "./components/Main/Downloads/downloads";
import AccountProfile from "./components/Account/AccountProfile/account-profile";
import AuthorProfile from "./components/Authors/AuthorProfile/author-profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import Paths from "./components/Paths/paths";
import ChangePassword from "./components/Authentication/ChangePassword/change-password";
import { AuthProvider, AuthContext } from "./provider/auth-provider";
import { ThemeProvider } from "./provider/theme-provider";
import ListCoursesPage from "./components/Courses/ListCoursesPage/list_courses_page";
import { CoursesProvider } from "./provider/course-provider";
import { ThemeContext } from "./provider/theme-provider";
import {
  ImageButtonProvider,
  ImageButtonContext,
} from "./provider/imageButton-provider";
import { LessonProvider } from "./provider/lesson-provider";
import { SearchProvider } from "./provider/search-provider";
import VideoMain from "./components/CourseDetail/video-main";
import { apiGetInfo } from "./core/services/account-service";
import { HistorySearchProvider } from "./provider/history-search-provider";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainNavigationStack = createStackNavigator();
const HomeNavigationStack = createStackNavigator();
const BrowseNavigationStack = createStackNavigator();
const DownloadNavigationStack = createStackNavigator();
const SearchNavigationStack = createStackNavigator();

const HomeStack = (props) => {
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const onPressListItem = () => {
    props.navigation.navigate("AccountProfile");
  };

  useEffect(() => {
    apiGetInfo(state.token)
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [useIsFocused()]);

  return (
    <HomeNavigationStack.Navigator initialRouteName="Home">
      <HomeNavigationStack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerLeft: null,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.foreground,
              }}
            >
              Home
            </Text>
          ),
          headerRight: () => (
            <View>
              {loading ? (
                <View></View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                  }}
                  style={{ marginRight: 20 }}
                >
                  <Image source={{ uri: data.avatar }} style={styles.image} />
                </TouchableOpacity>
              )}

              <Modal animationType="fade" transparent={true} visible={visible}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: "flex-end",
                    marginRight: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}
                  >
                    <Image
                      source={{ uri: state.userInfo.avatar }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.box,
                      {
                        backgroundColor: theme.background,
                        shadowColor: theme.foreground,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={{ marginTop: 0 }}
                      onPress={() => {
                        onPressListItem();
                        setVisible(false);
                      }}
                    >
                      <Text style={[styles.text]}>Quản lý tài khoản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }}>
                      <Text style={[styles.text]}>Cấu hình ứng dụng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        props.navigation.navigate("Login");
                      }}
                    >
                      <Text style={[styles.text, { color: "#E74C3C" }]}>
                        Đăng xuất
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ),
        }}
      />
      <HomeNavigationStack.Screen
        name="AccountProfile"
        component={AccountProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <HomeNavigationStack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <HomeNavigationStack.Screen
        name="VideoMain"
        component={VideoMain}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <HomeNavigationStack.Screen
        name="AuthorProfile"
        component={AuthorProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <HomeNavigationStack.Screen
        name="Paths"
        component={Paths}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
    </HomeNavigationStack.Navigator>
  );
};

const DownloadsStack = (props) => {
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const onPressListItem = () => {
    props.navigation.navigate("AccountProfile");
  };
  return (
    <DownloadNavigationStack.Navigator initialRouteName="Favorites">
      <DownloadNavigationStack.Screen
        name="Favorites"
        component={Downloads}
        options={{
          cardStyle: { backgroundColor: "#fff" },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerLeft: null,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.foreground,
              }}
            >
              Favorited Courses
            </Text>
          ),
          headerRight: () => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
                style={{ marginRight: 20 }}
              >
                <Image
                  source={{ uri: state.userInfo.avatar }}
                  style={styles.image}
                />
              </TouchableOpacity>

              <Modal animationType="fade" transparent={true} visible={visible}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: "flex-end",
                    marginRight: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}
                  >
                    <Image
                      source={{ uri: state.userInfo.avatar }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.box,
                      {
                        backgroundColor: theme.background,
                        shadowColor: theme.foreground,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={{ marginTop: 0 }}
                      onPress={() => {
                        onPressListItem();
                        setVisible(false);
                      }}
                    >
                      <Text style={[styles.text]}>Quản lý tài khoản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }}>
                      <Text style={[styles.text]}>Cấu hình ứng dụng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        props.navigation.navigate("Login");
                      }}
                    >
                      <Text style={[styles.text, { color: "#E74C3C" }]}>
                        Đăng xuất
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ),
        }}
      />
      <DownloadNavigationStack.Screen
        name="AccountProfile"
        component={AccountProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <DownloadNavigationStack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <DownloadNavigationStack.Screen
        name="VideoMain"
        component={VideoMain}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <DownloadNavigationStack.Screen
        name="AuthorProfile"
        component={AuthorProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <DownloadNavigationStack.Screen
        name="Paths"
        component={Paths}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
    </DownloadNavigationStack.Navigator>
  );
};

const BrowseStack = (props) => {
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const { title } = useContext(ImageButtonContext);
  const [visible, setVisible] = useState(false);

  const onPressListItem = () => {
    props.navigation.navigate("AccountProfile");
  };
  return (
    <BrowseNavigationStack.Navigator initialRouteName="Browse">
      <BrowseNavigationStack.Screen
        name="Browse"
        component={Browse}
        options={{
          cardStyle: { backgroundColor: "#fff" },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerLeft: null,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.foreground,
              }}
            >
              Browse
            </Text>
          ),
          headerRight: () => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
                style={{ marginRight: 20 }}
              >
                <Image
                  source={{ uri: state.userInfo.avatar }}
                  style={styles.image}
                />
              </TouchableOpacity>

              <Modal animationType="fade" transparent={true} visible={visible}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: "flex-end",
                    marginRight: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}
                  >
                    <Image
                      source={{ uri: state.userInfo.avatar }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.box,
                      {
                        backgroundColor: theme.background,
                        shadowColor: theme.foreground,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={{ marginTop: 0 }}
                      onPress={() => {
                        onPressListItem();
                        setVisible(false);
                      }}
                    >
                      <Text style={[styles.text]}>Quản lý tài khoản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }}>
                      <Text style={[styles.text]}>Cấu hình ứng dụng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        props.navigation.navigate("Login");
                      }}
                    >
                      <Text style={[styles.text, { color: "#E74C3C" }]}>
                        Đăng xuất
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ),
        }}
      />
      <BrowseNavigationStack.Screen
        name="AccountProfile"
        component={AccountProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <BrowseNavigationStack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <BrowseNavigationStack.Screen
        name="VideoMain"
        component={VideoMain}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <BrowseNavigationStack.Screen
        name="AuthorProfile"
        component={AuthorProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <BrowseNavigationStack.Screen
        name="ListCoursesPage"
        component={ListCoursesPage}
        options={{
          cardStyle: { backgroundColor: theme.background },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.foreground,
          headerLeft: null,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.foreground,
              }}
            >
              {title}
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.header} onPress={onPressListItem}>
              <Image
                source={{ uri: state.userInfo.avatar }}
                style={styles.image}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <BrowseNavigationStack.Screen
        name="Paths"
        component={Paths}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
    </BrowseNavigationStack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <SearchNavigationStack.Navigator
      initialRouteName="Search"
      screenOptions={{ headerShown: false }}
    >
      <SearchNavigationStack.Screen
        name="Search"
        component={Search}
        options={{ cardStyle: { backgroundColor: "#fff" } }}
      />
      <SearchNavigationStack.Screen
        name="AccountProfile"
        component={AccountProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <SearchNavigationStack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <SearchNavigationStack.Screen
        name="VideoMain"
        component={VideoMain}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <SearchNavigationStack.Screen
        name="AuthorProfile"
        component={AuthorProfile}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
      <SearchNavigationStack.Screen
        name="Paths"
        component={Paths}
        options={{ cardStyle: { backgroundColor: "#fff" }, headerShown: false }}
      />
    </SearchNavigationStack.Navigator>
  );
};
const TabNav = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "md-home" : "md-home";
          } else if (route.name === "Browse") {
            iconName = focused ? "md-list" : "md-list";
          } else if (route.name === "Favorites") {
            iconName = focused ? "md-heart" : "md-heart";
          } else if (route.name === "Search") {
            iconName = focused ? "md-search" : "md-search";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.activeTab,
        inactiveTintColor: theme.inactiveTab,
        style: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={DownloadsStack} />
      <Tab.Screen name="Browse" component={BrowseStack} />
      <Tab.Screen name="Search" component={SearchStack} />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <MainNavigationStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <MainNavigationStack.Screen
        name="Login"
        component={Login}
        options={{ cardStyle: { backgroundColor: "#fff" } }}
      />
      <MainNavigationStack.Screen
        name="Register"
        component={Register}
        options={{ cardStyle: { backgroundColor: "#fff" } }}
      />
      <MainNavigationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ cardStyle: { backgroundColor: "#fff" } }}
      />
      <MainNavigationStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ cardStyle: { backgroundColor: "#fff" } }}
      />
      <MainNavigationStack.Screen name="Main" component={TabNav} />
    </MainNavigationStack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CoursesProvider>
        <LessonProvider>
          <SearchProvider>
            <HistorySearchProvider>
            <NavigationContainer>
              <ThemeProvider>
                <ImageButtonProvider>
                  <MainNavigation />
                </ImageButtonProvider>
              </ThemeProvider>
            </NavigationContainer>
            </HistorySearchProvider>
          </SearchProvider>
        </LessonProvider>
      </CoursesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    marginTop: 50,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    marginTop: 0,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  box: {
    width: 170,
    height: 110,
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 17,
    color: "#3498DB",
  },
});
