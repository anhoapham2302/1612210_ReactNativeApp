import React, {useState} from 'react'

const FavContext = React.createContext()

const FavProvider = (props) => {
    const [fav, setFav] = useState([])
    return <FavContext.Provider value = {{fav, setFav}}>
        {props.children}
    </FavContext.Provider>
}

export {FavProvider, FavContext}