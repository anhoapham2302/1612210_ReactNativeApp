import React, {useReducer} from 'react'
import { searchReducer } from '../reducer/search-reducer'
import { getCoursesSearch } from '../action/search-action'

const SearchContext = React.createContext()

const initialState = {courses: [], instructors: [], coursesCount: -1, instructorsCount: -1, isLoading: true, isError: false, isFirst: true, coursesPage: 1, instructorsPage: 1}

const SearchProvider = (props) => {
    const [search_results, dispatch] = useReducer(searchReducer, initialState)
    return <SearchContext.Provider value = {{search_results, getCoursesSearch: getCoursesSearch(dispatch)}}>
        {props.children}
    </SearchContext.Provider>
}

export {SearchProvider, SearchContext}