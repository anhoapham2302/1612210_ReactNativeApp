import React, { useContext, useCallback } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";

export default function Website() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const url = "https://itedu.me/";

  const onPressWebsite = useCallback(async () => {
    await Linking.openURL(url);
  });
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={onPressWebsite}
        style={{ borderBottomWidth: 0.5, borderBottomColor: theme.foreground }}
      >
        <Text
          style={{ fontSize: 17, fontWeight: "bold", color: theme.foreground }}
        >
          {language.website}
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ fontSize: 14, color: theme.foreground }}>{url}</Text>
          <Text
            style={{
              fontSize: 14,
              color: "darkgrey",
              marginLeft: 5,
              fontStyle: "italic",
            }}
          >
            ({language.clickWebsite})
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
