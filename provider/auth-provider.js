import React, {useState} from 'react'
import { View, Text } from 'react-native'

const AuthContext = React.createContext()

const AuthProvider = (props) => {
    const [auth, setAuth] = useState(null)
    return <AuthContext.Provider value = {{auth, setAuth}}>
        {props.children}
    </AuthContext.Provider>
}

export {AuthProvider, AuthContext}
