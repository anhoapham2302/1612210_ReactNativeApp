import React, {useState} from 'react'

const BookmarkContext = React.createContext()

const BookmarkProvider = (props) => {
    const [bookmark, setBookmark] = useState([])
    return <BookmarkContext.Provider value = {{bookmark, setBookmark}}>
        {props.children}
    </BookmarkContext.Provider>
}

export {BookmarkProvider, BookmarkContext}