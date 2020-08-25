import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ListAuthorsItem from "../ListAuthorsItem/list-authors-item";
import Styles from "../../../global/style";
import { apiGetListAuthor } from "../../../core/services/author-service";
import { LanguageContext } from "../../../provider/language-provider";
import { ThemeContext } from "../../../provider/theme-provider";

const ListAuthor = (props) => {
  const {language} = useContext(LanguageContext);
  const {theme} = useContext(ThemeContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    apiGetListAuthor()
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={Styles.view}>
      <View style={{ flexDirection: "row" , justifyContent: "space-between"}}>
        <Text style={[Styles.text, { fontSize: 20, color: theme.foreground }]}>{props.title}</Text>
      </View>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <ListAuthorsItem navigation={props.navigation} item={item} />
        )}
      />
    </View>
  );
};

export default ListAuthor;
