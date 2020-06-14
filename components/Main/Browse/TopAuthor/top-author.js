import React from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import TopAuthorItem from '../TopAuthorItem/top-author-item'
import Styles from '../../../../global/style'
import authors from '../../../../global/authors'

const TopAuthor = (props) => {

    const renderListItems = (author) => {
        return author.map(item => <TopAuthorItem navigation={props.navigation} item = {item}/>);
    }
    console.log(authors)
    return <View style={Styles.view}>
        <View>
            <Text style = {Styles.text}>{props.title}</Text>
        </View>
        <ScrollView horizontal={true}>
            {renderListItems(authors)}
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
