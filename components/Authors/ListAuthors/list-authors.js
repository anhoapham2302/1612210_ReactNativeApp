import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ListAuthorsItem from '../ListAuthorsItem/list-authors-item';
import Styles from '../../../global/style';
import authors from '../../../global/authors';
import { apiGetListAuthor } from '../../../core/services/author-service';

const ListAuthor = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
      apiGetListAuthor()
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .catch((err) => console.log(err))
    }, [])
  
      return (
        <View style={Styles.view}> 
        <View>
            <Text style = {Styles.text}>{props.title}</Text>
        </View>
            <FlatList horizontal = {true}
                data={data}
                renderItem={({item})=><ListAuthorsItem navigation={props.navigation} item = {item}/>}
            />
        </View>
    )
}

export default ListAuthor

