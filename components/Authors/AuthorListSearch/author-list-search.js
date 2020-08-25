import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Styles from '../../../global/style'
import AuthorListSearchItem from '../AuthorListSearchItem/author-list-search-item';
import { SearchInstructorsContext } from '../../../provider/search-instructors-provider';

export default function AuthorListSearch(props) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        setData(props.data)
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
