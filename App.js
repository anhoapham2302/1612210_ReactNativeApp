import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native";
import Home from "./components/Main/Home/home";
import Browse from "./components/Main/Browse/browse";
import Search from "./components/Main/Search/search";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CourseDetail from "./components/CourseDetail/course-detail";
import Login from "./components/Authentication/Login/login";
import Register from "./components/Authentication/Register/register";
import ForgotPassword from "./components/Authentication/ForgotPassword/forgot-password";
import Downloads from "./components/Main/Downloads/downloads";
import AccountProfile from "./components/Account/AccountProfile/account-profile";
import AuthorProfile from "./components/Authors/AuthorProfile/author-profile";
import Ionicons from "react-native-vector-icons/Ionicons";
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
import VideoMain from "./components/VideoMain/video-main";
import { apiGetInfo } from "./core/services/account-service";
import { HistorySearchProvider } from "./provider/history-search-provider";
import { LanguageContext, LanguageProvider } from "./provider/language-provider";
import { SearchInstructorsProvider } from "./provider/search-instructors-provider";
import Setting from "./components/Setting/setting";
const Tab = createBottomTabNavigator();
const MainNavigationStack = createStackNavigator();
const HomeNavigationStack = createStackNavigator();
const BrowseNavigationStack = createStackNavigator();
const DownloadNavigationStack = createStackNavigator();
const SearchNavigationStack = createStackNavigator();

const HomeStack = (props) => {
  const {language} = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const { title } = useContext(ImageButtonContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const onPressProfile = () => {
    props.navigation.navigate("AccountProfile");
  };

  const onPressSetting = () => {
    props.navigation.navigate("Setting");
  }

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
              {language.cat}
            </Text>
          ),
          headerRight: () => (
            <View>
              {loading ? (
                <ActivityIndicator />
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
                  
                  {loading ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Image
                  source={{ uri: data.avatar }}
                  style={styles.image}
                />
              </TouchableOpacity>
              )}
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
                        onPressProfile();
                        setVisible(false);
                      }}
                    >
                      <Text style={[styles.text]}>{language.profile}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} 
                     onPress={() => {
                      onPressSetting();
                      setVisible(false);
                    }}>
                      <Text style={[styles.text]}>{language.setting}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        props.navigation.navigate("Login");
                      }}
                    >
                      <Text style={[styles.text, { color: "#E74C3C" }]}>
                        {language.logOut}
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
        name="Setting"
        component={Setting}
        options={{
          cardStyle: { backgroundColor: theme.background },
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
              {language.setting}
            </Text>
          ),        
        }}
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
        }}
      />
    </HomeNavigationStack.Navigator>
  );
};

const DownloadsStack = (props) => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    apiGetInfo(state.token)
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [useIsFocused()]);
 
  const onPressProfile = () => {
    props.navigation.navigate("AccountProfile");
  };

  const onPressSetting = () => {
    props.navigation.navigate("Setting");
  }
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
              {language.favorited}
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
                        onPressProfile();
                        setVisible(false);
                      }}
                    >
                      <Text style={[styles.text]}>{language.profile}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                        onPressSetting();
                        setVisible(false);
                      }}>
                      <Text style={[styles.text]}>{language.setting}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        props.navigation.navigate("Login");
                      }}
                    >
                      <Text style={[styles.text, { color: "#E74C3C" }]}>
                       {language.logOut}
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
        name="Setting"
        component={Setting}
        options={{
          cardStyle: { backgroundColor: theme.background },
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
              {language.setting}
            </Text>
          ),        
        }}
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
    </DownloadNavigationStack.Navigator>
  );
};

const BrowseStack = (props) => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const { title } = useContext(ImageButtonContext);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    apiGetInfo(state.token)
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [useIsFocused()]);
  const onPressProfile = () => {
    props.navigation.navigate("AccountProfile");
  };

  const onPressSetting = () => {
    props.navigation.navigate("Setting");
  }
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
              {language.home}
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
                        onPressProfile();
                        setVisible(false);
                      }}
                    >
                      <Text style={[styles.text]}>{language.profile}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }}>
                    <Text style={[styles.text]}   onPress={() => {
                        onPressSetting();
                        setVisible(false);
                      }}>{language.setting}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        props.navigation.navigate("Login");
                      }}
                    >
                      <Text style={[styles.text, { color: "#E74C3C" }]}>
                        {language.logOut}
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
        options={{ cardStyle: { backgroundColor: theme.background }, headerShown: false }}
      />
      <BrowseNavigationStack.Screen
        name="Setting"
        component={Setting}
        options={{
          cardStyle: { backgroundColor: theme.background },
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
              {language.setting}
            </Text>
          ),        
        }}
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
        }}
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
    </SearchNavigationStack.Navigator>
  );
};
const TabNav = () => {
  const {language} = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === language.home) {
            iconName = focused ? "md-home" : "md-home";
          } else if (route.name === language.cat) {
            iconName = focused ? "md-list" : "md-list";
          } else if (route.name === language.favorite) {
            iconName = focused ? "md-heart" : "md-heart";
          } else if (route.name === language.search) {
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
      <Tab.Screen name={language.home} component={BrowseStack} />
      <Tab.Screen name={language.favorite} component={DownloadsStack} />
      <Tab.Screen name={language.cat} component={HomeStack} />
      <Tab.Screen name={language.search} component={SearchStack} />
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
            <SearchInstructorsProvider>
            <HistorySearchProvider>
            <NavigationContainer>
              <LanguageProvider>
              <ThemeProvider>
                <ImageButtonProvider>
                  <MainNavigation />
                </ImageButtonProvider>
                </ThemeProvider>
                </LanguageProvider>
            </NavigationContainer>
            </HistorySearchProvider>
            </SearchInstructorsProvider>
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
