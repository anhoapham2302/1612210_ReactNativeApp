import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Home from './components/Main/Home/home';
import Browse from './components/Main/Browse/browse';
import Search from './components/Main/Search/search';
import ListCourses from './components/Courses/ListCourses/list-courses'
import { NavigationContainer } from '@react-navigation/native';
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
import { AuthProvider } from './provider/auth-provider';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainNavigationStack = createStackNavigator();
const HomeNavigationStack = createStackNavigator();
const BrowseNavigationStack = createStackNavigator();
const DownloadNavigationStack = createStackNavigator();
const SearchNavigationStack = createStackNavigator();

const HomeStack = (props) =>{
  const onPressListItem =()=>{
    props.navigation.navigate("AccountProfile")
}
  return(
    <HomeNavigationStack.Navigator initialRouteName = "Home">
    <HomeNavigationStack.Screen name="Home" component={Home} options={{cardStyle:{backgroundColor:'#fff'}, headerRight: () => (
            <TouchableOpacity onPress={onPressListItem}>
              <Image source={{uri: 'https://lucloi.vn/wp-content/uploads/2020/03/90443889_1016737482055036_219143065531580416_n.jpg'}} style = {{height:40, width:40, borderRadius:20, marginRight:20}} />
            </TouchableOpacity>
          ),}}/>
    <HomeNavigationStack.Screen name="AccountProfile" component={AccountProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <HomeNavigationStack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <HomeNavigationStack.Screen name="AuthorProfile" component={AuthorProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <HomeNavigationStack.Screen name="Paths" component={Paths} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    </HomeNavigationStack.Navigator>);
}

const DownloadsStack = (props) =>{
  const onPressListItem =()=>{
    props.navigation.navigate("AccountProfile")
}
  return(
    <DownloadNavigationStack.Navigator initialRouteName = "Downloads">
    <DownloadNavigationStack.Screen name="Downloads" component={Downloads} options={{cardStyle:{backgroundColor:'#fff'}, headerRight: () => (
            <TouchableOpacity onPress={onPressListItem}>
              <Image source={{uri: 'https://lucloi.vn/wp-content/uploads/2020/03/90443889_1016737482055036_219143065531580416_n.jpg'}} style = {{height:40, width:40, borderRadius:20, marginRight:20}} />
            </TouchableOpacity>
          ),}}/>
   <DownloadNavigationStack.Screen name="AccountProfile" component={AccountProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <DownloadNavigationStack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <DownloadNavigationStack.Screen name="AuthorProfile" component={AuthorProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <DownloadNavigationStack.Screen name="Paths" component={Paths} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    </DownloadNavigationStack.Navigator>);
}

const BrowseStack = (props) =>{
  const onPressListItem =()=>{
    props.navigation.navigate("AccountProfile")
}
  return(
    <BrowseNavigationStack.Navigator initialRouteName = "Browse">
    <BrowseNavigationStack.Screen name="Browse" component={Browse} options={{cardStyle:{backgroundColor:'#fff'}, headerRight: () => (
            <TouchableOpacity onPress={onPressListItem}>
              <Image source={{uri: 'https://lucloi.vn/wp-content/uploads/2020/03/90443889_1016737482055036_219143065531580416_n.jpg'}} style = {{height:40, width:40, borderRadius:20, marginRight:20}} />
            </TouchableOpacity>
          ),}}/>
    <BrowseNavigationStack.Screen name="AccountProfile" component={AccountProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <BrowseNavigationStack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    <BrowseNavigationStack.Screen name="AuthorProfile" component={AuthorProfile} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
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
            else if (route.name === 'Downloads') {
              iconName = focused ? 'md-arrow-down' : 'md-arrow-down';
            }
            else if (route.name === 'Search') {
              iconName = focused ? 'md-search' : 'md-search';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Downloads" component={DownloadsStack}/> 
      <Tab.Screen name="Browse" component={BrowseStack}/>
      <Tab.Screen name="Search" component={SearchStack}/>
      </Tab.Navigator>
  )
}

const MainNavigation = () => {
  return <MainNavigationStack.Navigator initialRouteName = "Login" screenOptions={{headerShown:false}}>
        <MainNavigationStack.Screen name="Login" component={Login} options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="Register" component={Register} options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="ForgotPassword" component={ForgotPassword} options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="ChangePassword" component={ChangePassword} options={{cardStyle:{backgroundColor:'#fff'}}}/>
        <MainNavigationStack.Screen name="Main" component={TabNav}/>
  </MainNavigationStack.Navigator>
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
          <MainNavigation/>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red', 
    marginTop: 50,
  },
});
