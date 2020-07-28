import React, {useReducer} from 'react'
import { lessonReducer } from '../reducer/lesson-reducer'
import { getLesson } from '../action/lesson-action'

const LessonContext = React.createContext()

const initialState = {data: [], isLoading: true, isError: false}

const LessonProvider = (props) => {
    const [lesson, dispatch] = useReducer(lessonReducer, initialState)
    return <LessonContext.Provider value = {{lesson, getLesson: getLesson(dispatch)}}>
        {props.children}
    </LessonContext.Provider>
}

export {LessonProvider, LessonContext}