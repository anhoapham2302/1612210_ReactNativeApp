import React, {useReducer} from 'react'
import {loginReducer} from '../reducer/auth-reducer'
import { login, loginGoogle } from '../action/auth-action'
const AuthContext = React.createContext()

//login
const initialState = {
    isAuthenticating: true,
    isAuthenticated: false,
    userInfo: null,
    token: null
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(loginReducer, initialState)
    return <AuthContext.Provider value = {{state, login: login(dispatch), loginGoogle: loginGoogle(dispatch)}}>
        {props.children}
    </AuthContext.Provider>
}

export {AuthProvider, AuthContext}
