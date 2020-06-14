import React, {useState} from 'react'

const AuthorContext = React.createContext()

const AuthorProvider = (props) => {
    const [author, setAuthor] = useState([])
    return <AuthorContext.Provider value = {{author, setAuthor}}>
        {props.children}
    </AuthorContext.Provider>
}

export {AuthorProvider, AuthorContext}