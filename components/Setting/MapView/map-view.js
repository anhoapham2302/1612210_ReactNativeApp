import React, { useContext, useCallback, useState } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import MapView from 'react-native-maps';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";
import { Dimensions } from "react-native";

export default function Map() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [mapVisible, setMapVisible] = useState(false);
  // const onPressButton = () => {
  //     if(mapVisible === true){
  //         setMapVisible(false)
  //     }else{
  //         setMapVisible(true)
  //     }
  // };
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        style={{ borderBottomWidth: 0.5, borderBottomColor: theme.foreground }}
      >
        <Text
          style={{ fontSize: 17, fontWeight: "bold", color: theme.foreground }}
        >
          {language.address}
        </Text>
        <View style={{ flexDirection: "column", marginBottom: 5 }}>
  <Text style={{ fontSize: 14, color: theme.foreground }}>{language.mainAddress}</Text>
          <Text
            style={{
              fontSize: 14,
              color: "darkgrey",
              marginLeft: 5,
              fontStyle: "italic",
            }}
          >
            ({language.openMap})
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
});
