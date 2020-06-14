import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ListAuthorsItem from '../ListAuthorsItem/list-authors-item';
import Styles from '../../../global/style';
import authors from '../../../global/authors';

const ListAuthor = (props) => {
    // const authors = [
    //     {
    //         id : 1,
    //         name: 'Author 1',
    //         count: 10
    //     },
    //     {
    //         id : 2,
    //         name: 'Author 2',
    //         count: 20
    //     },
    //     {
    //         id : 3,
    //         name: 'Author 3',
    //         count: 15
    //     },
    //     {
    //         id : 4,
    //         name: 'Author 4',
    //         count: 25
    //     },
      
    // ]

    const renderSeparator = () => {
        return (
          <View
            style={Styles.renderseparator}
          />
        );
      };
    
      return (
        <View style={Styles.view}> 
        <View>
            <Text style = {Styles.text}>{props.title}</Text>
        </View>
            <FlatList
                data={authors}
                renderItem={({item})=><ListAuthorsItem navigation={props.navigation} item = {item}/>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

export default ListAuthor

