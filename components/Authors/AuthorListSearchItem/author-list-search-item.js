import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { apiAuthorDetail } from "../../../core/services/author-service";
import { ThemeContext } from "../../../provider/theme-provider";
import { LanguageContext } from "../../../provider/language-provider";

export default function AuthorListSearchItem(props) {
  const {language} = useContext(LanguageContext);
    const {theme} = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiAuthorDetail(props.item.id)
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .finally(() => setLoading(false));
  }, []);
  const onPressListItem = () => {
    props.navigation.navigate("AuthorProfile", { item: data });
  };
  return (
    <View style={[styles.view]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.item} onPress={onPressListItem}>
                      <View style={{flexDirection: 'row'}}>

            <Image source={{ uri: data.avatar }} style={styles.image} />
            <View style={{flexDirection: 'column', marginTop: 15, marginLeft: 5}}>
            <Text style = {{fontSize: 17, color: theme.foreground, fontWeight: 'bold'}}>{data.name}</Text>
            <Text style = {{color: 'darkgrey'}}>{language.course}: {data.totalCourse}</Text>
            </View>
            </View>

        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    marginLeft: 15,
  },
  item: {},
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: 5,
    marginRight: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    paddingLeft: 5,
  },
});
