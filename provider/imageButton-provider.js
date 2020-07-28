import React, {useState} from 'react'

const ImageButtonContext = React.createContext()

const ImageButtonProvider = (props) => {
    const [title, setTitle] = useState([])
    return <ImageButtonContext.Provider value = {{title, setTitle}}>
        {props.children}
    </ImageButtonContext.Provider>
}

export {ImageButtonProvider, ImageButtonContext}