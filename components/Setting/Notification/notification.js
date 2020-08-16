import React, { useContext, useCallback, useState } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { Switch } from 'react-native-paper';
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";

export default function Notification() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={{ marginBottom: 10 }}>
      <View 
        style={{ borderBottomWidth: 0.5, borderBottomColor: theme.foreground , flexDirection:'row'}}
      >
        <Text
          style={{ fontSize: 17, fontWeight: "bold", color: theme.foreground }}
        >
          {language.noti}
        </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style = {{marginLeft: 20}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
