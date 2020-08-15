import React, {useReducer} from 'react'
import { searchInstructorsReducer } from '../reducer/search-instructors-reducer'
import { getInstructorsSearch } from '../action/search-action'

const SearchInstructorsContext = React.createContext()

const initialState = {instructors: [], instructorsCount: 0, instructorsPage: 1}

const SearchInstructorsProvider = (props) => {
    const [search_instructors_results, dispatch] = useReducer(searchInstructorsReducer, initialState)
    return <SearchInstructorsContext.Provider value = {{search_instructors_results, getInstructorsSearch: getInstructorsSearch(dispatch)}}>
        {props.children}
    </SearchInstructorsContext.Provider>
}

export {SearchInstructorsProvider, SearchInstructorsContext}