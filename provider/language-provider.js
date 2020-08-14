import React, {useState} from 'react'
import { languages } from '../global/language'

const LanguageContext = React.createContext()

const LanguageProvider = (props) => {
    const [language, setLanguage] = useState(languages.vi)
    return <LanguageContext.Provider value = {{language, setLanguage}}>
        {props.children}
    </LanguageContext.Provider>
}

export {LanguageProvider, LanguageContext}