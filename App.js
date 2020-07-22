import React, { useContext, useState, useEffect, useReducer} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import Home from './components/Main/Home/home';
import Browse from './components/Main/Browse/browse';
import Search from './components/Main/Search/search';
import ListCourses from './components/Courses/ListCourses/list-courses'
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SectionCourses from './components/Main/Home/SectionCourses/section-courses';
import VideoPlayer from './components/CourseDetail/VideoPlayer/video-player';
import CourseDetail from './components/CourseDetail/course-detail';
import Login from './components/Authentication/Login/login';
import Register from './components/Authentication/Register/register';
import ForgotPassword from './components/Authentication/ForgotPassword/forgot-password';
import Downloads from './components/Main/Downloads/downloads';
import AccountProfile from './components/Account/AccountProfile/account-profile';
import AuthorProfile from './components/Authors/AuthorProfile/author-profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paths from './components/Paths/paths';
import ChangePassword from './components/Authentication/ChangePassword/change-password';
import { AuthProvider, AuthContext } from './provider/auth-provider';
import { FavProvider } from './provider/favorite-provider';
import { pushCoursesOfAuthor } from './core/services/author-service';
import { AuthorProvider } from './provider/author-provider';
import { BookmarkContext, BookmarkProvider } from './provider/bookmark-provider';
import {ThemeProvider} from './provider/theme-provider'
import ListCoursesPage from './components/Courses/ListCoursesPage/list_courses_page'
import { CoursesProvider } from './provider/course-provider';
import { ThemeContext } from './provider/theme-provider';
import { ImageButtonProvider, ImageButtonContext } from './provider/imageButton-provider';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainNavigationStack = createStackNavigator();
const HomeNavigationStack = createStackNavigator();
const BrowseNavigationStack = createStackNavigator();
const DownloadNavigationStack = createStackNavigator();
const SearchNavigationStack = createStackNavigator();

const HomeStack = (props) =>{
  const {theme} = useContext(ThemeContext)
  const {state} = useContext(AuthContext)
  const onPressListItem =()=>{
    props.navigation.navigate("AccountProfile")
}
  
  return(
    <HomeNavigationStack.Navigator initialRouteName = "Home">
    <HomeNavigationStack.Screen name="Home" component={Home} options={{ 
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTitle: () => (
        <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.foreground}}>Home</Text>
        ),
      headerRight: () => (
            <TouchableOpacity style = {styles.header} onPress={onPressListItem}>
              <Image source={{uri: state.userInfo.avatar}} style = {styles.image} />
            </TouchableOpacity>
          ),}}/>
    <HomeNavigationStack.Screen name="AccountProfile" component={AccountProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <HomeNavigationStack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <HomeNavigationStack.Screen name="AuthorProfile" component={AuthorProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <HomeNavigationStack.Screen name="Paths" component={Paths} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    </HomeNavigationStack.Navigator>);
}

const DownloadsStack = (props) =>{
  const {theme} = useContext(ThemeContext)
  const {state} = useContext(AuthContext)

  const onPressListItem =()=>{
    props.navigation.navigate("AccountProfile")
}
  return(
    <DownloadNavigationStack.Navigator initialRouteName = "Favorites">
    <DownloadNavigationStack.Screen name="Favorites" component={Downloads} options={{cardStyle:{backgroundColor:'#fff'}, 
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTitle: () => (
        <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.foreground}}>Favorited Courses</Text>
        ),
      headerRight: () => (
        <TouchableOpacity style = {styles.header} onPress={onPressListItem}>
          <Image source={{uri: state.userInfo.avatar}} style = {styles.image} />
        </TouchableOpacity>
      ),}}/>
   <DownloadNavigationStack.Screen name="AccountProfile" component={AccountProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <DownloadNavigationStack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <DownloadNavigationStack.Screen name="AuthorProfile" component={AuthorProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <DownloadNavigationStack.Screen name="Paths" component={Paths} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    </DownloadNavigationStack.Navigator>);
}

const BrowseStack = (props) =>{
  const {theme} = useContext(ThemeContext)
  const {state} = useContext(AuthContext)
  const {title} = useContext(ImageButtonContext)

  const onPressListItem =()=>{
    props.navigation.navigate("AccountProfile")
}
  return(
    <BrowseNavigationStack.Navigator initialRouteName = "Browse">
    <BrowseNavigationStack.Screen name="Browse" component={Browse} options={{cardStyle:{backgroundColor:'#fff'}, 
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTitle: () => (
        <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.foreground}}>Browse</Text>
        ),
      headerRight: () => (
        <TouchableOpacity style = {styles.header} onPress={onPressListItem}>
          <Image source={{uri: state.userInfo.avatar}} style = {styles.image} />
        </TouchableOpacity>
      ),}}/>
    <BrowseNavigationStack.Screen name="AccountProfile" component={AccountProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <BrowseNavigationStack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <BrowseNavigationStack.Screen name="AuthorProfile" component={AuthorProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <BrowseNavigationStack.Screen name="ListCoursesPage" component={ListCoursesPage} options={{cardStyle:{backgroundColor:theme.background},
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTintColor: theme.foreground,
      headerLeft: null,
      headerTitle: () => (
      <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.foreground}}>{title}</Text>
      ),
      headerRight: () => (
            <TouchableOpacity style = {styles.header} onPress={onPressListItem}>
              <Image source={{uri: state.userInfo.avatar}} style = {styles.image} />
            </TouchableOpacity>
          )
    }}/>
    <BrowseNavigationStack.Screen name="Paths" component={Paths} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    </BrowseNavigationStack.Navigator>);
}

const SearchStack = () =>{
  return(
    <SearchNavigationStack.Navigator initialRouteName = "Search" screenOptions={{headerShown:false}}>
    <SearchNavigationStack.Screen name="Search" component={Search} options={{cardStyle:{backgroundColor:'#fff'}}}/>
    <SearchNavigationStack.Screen name="AccountProfile" component={AccountProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <SearchNavigationStack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <SearchNavigationStack.Screen name="AuthorProfile" component={AuthorProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <SearchNavigationStack.Screen name="Paths" component={Paths} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    </SearchNavigationStack.Navigator>);
}
const TabNav = () =>{
  const {theme} = useContext(ThemeContext)
  return(
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'md-home'
                : 'md-home';
            } else if (route.name === 'Browse') {
              iconName = focused ? 'md-list' : 'md-list';
            }
            else if (route.name === 'Favorites') {
              iconName = focused ? 'md-heart' : 'md-heart';
            }
            else if (route.name === 'Search') {
              iconName = focused ? 'md-search' : 'md-search';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.activeTab,
          inactiveTintColor: theme.inactiveTab,
          style: {
            backgroundColor: theme.background
          }
        }}
        >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={DownloadsStack}/> 
      <Tab.Screen name="Browse" component={BrowseStack}/>
      <Tab.Screen name="Search" component={SearchStack}/>
      </Tab.Navigator>
  )
}

const MainNavigation = () => {
  return <MainNavigationStack.Navigator initialRouteName = "Login" screenOptions={{headerShown:false}} >
        <MainNavigationStack.Screen name="Login" component={Login}  options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="Register" component={Register} options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="ForgotPassword" component={ForgotPassword} options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="ChangePassword" component={ChangePassword} options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="Main" component={TabNav}/>
  </MainNavigationStack.Navigator>
}

export default function App() {
  return (
    <AuthProvider>
      <CoursesProvider>
            <AuthorProvider>
              <NavigationContainer>
                <ThemeProvider>
                  <ImageButtonProvider>
                    {pushCoursesOfAuthor()}
                    <MainNavigation/>
                    </ImageButtonProvider>
                </ThemeProvider>      
              </NavigationContainer>
            </AuthorProvider>
      </CoursesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red', 
    marginTop: 50,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
  },
  image: {
    height:50, 
    width:50, 
    borderRadius:25, 
    marginRight:20
  }
});
