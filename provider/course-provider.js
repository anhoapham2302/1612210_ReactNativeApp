import React, {useReducer} from 'react'
import { coursesReducer } from '../reducer/courses-reducer'
import { renderFavoriteCourses, requestReload } from '../action/account-action'

const CoursesContext = React.createContext()

const initialState = {data: [], isLoading: true, isError: false, reload: false}

const CoursesProvider = (props) => {
    const [courses, dispatch] = useReducer(coursesReducer, initialState)
    return <CoursesContext.Provider value = {{courses, renderFavoriteCourses: renderFavoriteCourses(dispatch), requestReload: requestReload(dispatch)}}>
        {props.children}
    </CoursesContext.Provider>
}

export {CoursesProvider, CoursesContext}