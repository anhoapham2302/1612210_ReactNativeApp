import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SearchInput from './SearchInput/search-input'
import ListCoursesSearch from './ListCoursesSearch/list-courses-search'
import ListAuthor from '../../Authors/ListAuthors/list-authors'
import ListPaths from '../../Paths/ListPaths/list-paths'

const Search = (props) => {
    return (
        <ScrollView>
            <SearchInput/>
            <ListCoursesSearch title = 'Courses'/>
            <ListPaths title = 'Paths'/>
            <ListAuthor title = 'Authors'/>
        </ScrollView>
    )
}



const styles = StyleSheet.create({})
export default Search
