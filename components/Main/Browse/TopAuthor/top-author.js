import React from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import TopAuthorItem from '../TopAuthorItem/top-author-item'
import Styles from '../../../../global/style'

const TopAuthor = (props) => {
    const author = [
        {
            id : 1,
            name: 'Author 1',
        },
        {
            id : 2,
            name: 'Author 2',
        },
        {
            id : 3,
            name: 'Author 3',
        },
        {
            id : 4,
            name: 'Author 4',
        },
        {
            id : 5,
            name: 'Author 5',
        },
        {
            id : 6,
            name: 'Author 6',
        },
        {
            id : 7,
            name: 'Author 7',
        },
        {
            id : 8,
            name: 'Author 8',
        },
      
    ]

    const renderListItems = (author) => {
        return author.map(item => <TopAuthorItem item = {item}/>);
    }

    return <View style={Styles.view}>
        <View>
            <Text style = {Styles.text}>{props.title}</Text>
        </View>
        <ScrollView horizontal={true}>
            {renderListItems(author)}
        </ScrollView>
    </View>
}


const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    }
})

export default TopAuthor
