import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Main/Home/home';
import ListCourses from './components/Courses/ListCourses/list-courses';
import Browse from './components/Main/Browse/browse';

export default function App() {
  return (
    <View style={styles.container}>
      <Browse/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});
