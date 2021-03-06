import React, { useContext } from "react";
import {
  View,
  FlatList,
  Text
} from "react-native";
import ListCoursesItem from "../ListCoursesItem/list-courses-item";
import Styles from "../../../global/style";
import { LanguageContext } from "../../../provider/language-provider";
import { ThemeContext } from "../../../provider/theme-provider";



const ListCourses = (props) => {
  const {language} = useContext(LanguageContext);
  const {theme} = useContext(ThemeContext);


  const renderSeparator = () => {
    return <View style={Styles.renderseparator} />;
  };
  return (
    <View style={Styles.view}>
      {props.item.length === 0 ? <Text style={{color: theme.foreground}}>{language.empty}</Text> : (<FlatList
        data={props.item}
        renderItem={({ item }) => (
          <ListCoursesItem navigation={props.navigation} item={item} />
        )}
        ItemSeparatorComponent={renderSeparator}
      />   )}
      
    </View>
  );
};

export default ListCourses;
