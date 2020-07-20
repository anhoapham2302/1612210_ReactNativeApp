import React, {useReducer} from 'react'
import { coursesReducer } from '../reducer/courses-reducer'
import { renderFavoriteCourses } from '../action/account-action'

const CoursesContext = React.createContext()

const initialState = {data: [], isLoading: true, isError: false}

const CoursesProvider = (props) => {
    const [courses, dispatch] = useReducer(coursesReducer, initialState)
    return <CoursesContext.Provider value = {{courses, renderFavoriteCourses: renderFavoriteCourses(dispatch)}}>
        {props.children}
    </CoursesContext.Provider>
}

export {CoursesProvider, CoursesContext}