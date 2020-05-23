import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ListPathsItem from '../ListPathsItem/list-paths-item';
import Styles from '../../../global/style';

const ListPaths = (props) => {
    const paths = [
        {
            id : 1,
            name: 'Path 1',
            count: 10
        },
        {
            id : 2,
            name: 'Path 2',
            count: 20
        },
        {
            id : 3,
            name: 'Path 3',
            count: 15
        },
        {
            id : 4,
            name: 'Path 4',
            count: 25
        },
      
    ]

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
                data={paths}
                renderItem={({item})=><ListPathsItem navigation={props.navigation} item = {item}/>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

export default ListPaths

