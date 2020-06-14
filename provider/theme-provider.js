import React, {useState} from 'react'
import { themes } from '../global/theme'

const ThemeContext = React.createContext()

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.dark)
    return <ThemeContext.Provider value = {{theme, setTheme}}>
        {props.children}
    </ThemeContext.Provider>
}

export {ThemeProvider, ThemeContext}