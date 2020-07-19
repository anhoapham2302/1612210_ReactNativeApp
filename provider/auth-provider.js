import React, {useReducer} from 'react'
import {authReducer} from '../reducer/auth-reducer'
import { login } from '../action/auth-action'
const AuthContext = React.createContext()

const initialState = {
    isAuthenticating: true,
    isAuthenticated: false,
    userInfo: null,
    token: null
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    return <AuthContext.Provider value = {{state, login: login(dispatch)}}>
        {props.children}
    </AuthContext.Provider>
}

export {AuthProvider, AuthContext}
