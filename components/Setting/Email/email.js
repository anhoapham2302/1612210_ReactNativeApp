import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../../provider/theme-provider";

export default function Email() {
  const { theme } = useContext(ThemeContext);
  const email = '1612210@student.hcmus.edu.vn';

  return (
    <View style={{ marginBottom: 10 }}>
      <View 
        style={{ borderBottomWidth: 0.5, borderBottomColor: theme.foreground }}
      >
        <Text
          style={{ fontSize: 17, fontWeight: "bold", color: theme.foreground }}
        >
          Email
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ fontSize: 14, color: theme.foreground }}>{email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
