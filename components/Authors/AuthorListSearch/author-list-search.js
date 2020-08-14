import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SearchContext } from '../../../provider/search-provider'
import Styles from '../../../global/style'
import AuthorListSearchItem from '../AuthorListSearchItem/author-list-search-item';

export default function AuthorListSearch(props) {
    const {search_results} = useContext(SearchContext);
    var data;

    if(props.com === "ListAuthor"){
        data = props.data
    }else{
        data = search_results.instructors
    }
    const renderSeparator = () => {
        return <View style={[Styles.renderseparator, {marginTop: 10, marginLeft: 15}]} />;
      };
    return (
        <View> 
            <FlatList horizontal = {false}
                data={data}
                renderItem={({item})=><AuthorListSearchItem navigation={props.navigation} item = {item}/>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

const styles = StyleSheet.create({})