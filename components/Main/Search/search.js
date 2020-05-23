import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SearchInput from './SearchInput/search-input'
import ListAuthor from '../../Authors/ListAuthors/list-authors'
import ListPaths from '../../Paths/ListPaths/list-paths'
import ListCourses from '../../Courses/ListCourses/list-courses'

const Search = (props) => {
    return (
        <ScrollView>
            <SearchInput/>
            <ListCourses title = 'Courses' navigation={props.navigation}/>
            <ListPaths title = 'Paths' navigation={props.navigation}/>
            <ListAuthor title = 'Authors' navigation={props.navigation}/>
        </ScrollView>
    )
}



const styles = StyleSheet.create({})
export default Search
