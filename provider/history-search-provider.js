import React, {useState} from 'react'

const HistorySearchContext = React.createContext()

const HistorySearchProvider = (props) => {
    const [visible, setVisible] = useState(true)
    return <HistorySearchContext.Provider value = {{visible, setVisible}}>
        {props.children}
    </HistorySearchContext.Provider>
}

export {HistorySearchProvider, HistorySearchContext}