import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import SectionPathsItem from '../SectionPathsItem/section-paths-item';

const SectionPaths = (props) => {
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

    const renderListItems = (paths) => {
        return paths.map(item => <SectionPathsItem navigation={props.navigation} item = {item}/>);
    }

    return <View style = {styles.view}>
        <View>
            <Text style = {styles.text}>{props.title}</Text>
        </View>
        <ScrollView horizontal={true}>
            {renderListItems(paths)}
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    view:{
        marginTop: 15,
        marginLeft: 17
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    }
})

export default SectionPaths;