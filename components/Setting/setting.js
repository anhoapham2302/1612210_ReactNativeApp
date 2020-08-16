import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ChangeTheme from './ChangeTheme/change-theme'
import { ThemeContext } from '../../provider/theme-provider'
import ChangeLanguage from './ChangeLanguage/change-language';
import Website from './Website/website';
import Email from './Email/email';
import Notification from './Notification/notification';
import Map from './MapView/map-view';

export default function Setting() {
    const {theme} = useContext(ThemeContext);
    return (
        <View style = {{paddingLeft: 15, marginTop: 10, backgroundColor: theme.background}}>
            <Website />
            <Email />
            <Map />
            <Notification />
            <ChangeTheme />
            <ChangeLanguage/>
        </View>
    )
}

