import React, { useState, useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../../provider/auth-provider";
import { useIsFocused } from "@react-navigation/native";
import { apiGetHistorySearch } from "../../../core/services/search-service";
import { ActivityIndicator } from "react-native-paper";

export default function HistorySearch() {
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (isFocus === true) {
      apiGetHistorySearch(state.token)
        .then((response) => response.json())
        .then((res) => setData(res.payload.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [isFocus]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        data.map((item) => {
          return <Text>{item.content}</Text>;
        })
      )}
    </View>
  );
}
