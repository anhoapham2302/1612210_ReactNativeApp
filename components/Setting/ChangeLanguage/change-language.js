import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";
import { languages } from "../../../global/language";

export default function ChangeLanguage() {
  const { theme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);

  const changeLanguage = () => {
      if(language === languages.vi){
          setLanguage(languages.en)
      }else{
          setLanguage(languages.vi)
      }
  }

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={changeLanguage} style={{borderBottomWidth: 0.5, borderBottomColor: theme.foreground}}>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: theme.foreground}}>{language.language}</Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
        {language === languages.vi ? (
          <Text style={{fontSize: 14, color: theme.foreground}}>{language.vie}</Text>
        ) : (
          <Text style={{fontSize: 14, color: theme.foreground}}>{language.eng}</Text>
        )}
         <Text style={{fontSize: 14, color: 'darkgrey', marginLeft: 5, fontStyle: 'italic'}}>({language.changeLanguage})</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
