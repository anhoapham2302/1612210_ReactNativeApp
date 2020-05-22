import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const Stack = createStackNavigator();

const HomeStack = () =>{
  return(
    <Stack.Navigator initialRouteName = "Home">
    <Stack.Screen name="Home" component={Home} options={{cardStyle:{backgroundColor:'#fff'}}}/>
    <Stack.Screen name="CourseDetail" component={CourseDetail} options={{cardStyle:{backgroundColor:'#fff'}, headerShown:false}}/>
    </Stack.Navigator>);
}

const BrowseStack = () =>{
  return(
    <Stack.Navigator initialRouteName = "Browse">
    <Stack.Screen name="Browse" component={Browse} options={{cardStyle:{backgroundColor:'#fff'}}}/>
    </Stack.Navigator>);
}

const SearchStack = () =>{
  return(
    <Stack.Navigator initialRouteName = "Search" screenOptions={{headerShown:false}}>
    <Stack.Screen name="Search" component={Search} options={{cardStyle:{backgroundColor:'#fff'}}}/>
    </Stack.Navigator>);
}
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      {/* <Tab.Screen name="Downloads" component={CourseDetail}/> */}
      <Tab.Screen name="Browse" component={BrowseStack}/>
      <Tab.Screen name="Search" component={SearchStack}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: 50,
  },
});
