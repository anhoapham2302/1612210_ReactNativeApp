import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";
import { themes } from "../../../global/theme";

export default function ChangeTheme() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const changeTheme = () => {
      if(theme === themes.light){
          setTheme(themes.dark)
      }else{
          setTheme(themes.light)
      }
  }

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={changeTheme} style={{borderBottomWidth: 0.5, borderBottomColor: theme.foreground}}>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: theme.foreground}}>{language.theme}</Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
        {theme === themes.light ? (
          <Text style={{fontSize: 14, color: theme.foreground}}>{language.light}</Text>
        ) : (
          <Text style={{fontSize: 14, color: theme.foreground}}>{language.dark}</Text>
        )}
         <Text style={{fontSize: 14, color: 'darkgrey', marginLeft: 5, fontStyle: 'italic'}}>({language.changeTheme})</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
