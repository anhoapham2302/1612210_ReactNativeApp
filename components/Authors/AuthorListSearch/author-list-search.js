import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SearchContext } from '../../../provider/search-provider'
import Styles from '../../../global/style'
import AuthorListSearchItem from '../AuthorListSearchItem/author-list-search-item';

export default function AuthorListSearch(props) {
    const {search_results} = useContext(SearchContext);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        if(props.com === "ListAuthor"){
            setData(props.data)
        }else{
            setData(search_results.instructors)
        }
    }, [])
    
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
