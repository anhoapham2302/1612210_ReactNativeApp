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
import authors from "../../../global/authors";
import { apiGetListAuthor } from "../../../core/services/author-service";
import AuthorListSearch from "../AuthorListSearch/author-list-search";
import { LanguageContext } from "../../../provider/language-provider";

const ListAuthor = (props) => {
  const {language} = useContext(LanguageContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    apiGetListAuthor()
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .catch((err) => console.log(err));
  }, []);
const onPressMore = () => {
    <AuthorListSearch navigation={props.navigation} data={data} com = "ListAuthor"/>
}
  return (
    <View style={Styles.view}>
      <View style={{ flexDirection: "row" , justifyContent: "space-between"}}>
        <Text style={[Styles.text, { fontSize: 20 }]}>{props.title}</Text>
        <TouchableOpacity>
          <Text
            style={{
              marginRight: 15,
              marginTop: 5,
              fontSize: 15,
              color: "#4DC4FF",
            }}
          >
            {language.more} {">>"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={data.slice(0,10)}
        renderItem={({ item }) => (
          <ListAuthorsItem navigation={props.navigation} item={item} />
        )}
      />
    </View>
  );
};

export default ListAuthor;
