import React, {useState, useReducer} from 'react'
import { historySearchReducer } from '../reducer/history-search-reducer'
import { historySearchAction } from '../action/search-action'

const HistorySearchContext = React.createContext()

const initialState = {
    visible: true,
    text: null,
}

const HistorySearchProvider = (props) => {
    const [historySearch, dispatch] = useReducer(historySearchReducer,initialState)
    return <HistorySearchContext.Provider value = {{historySearch, historySearchAction: historySearchAction(dispatch)}}>
        {props.children}
    </HistorySearchContext.Provider>
}

export {HistorySearchProvider, HistorySearchContext}