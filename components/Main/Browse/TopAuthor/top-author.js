import React, { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import TopAuthorItem from '../TopAuthorItem/top-author-item'
import Styles from '../../../../global/style'
import authors from '../../../../global/authors'
import { ThemeContext } from '../../../../provider/theme-provider'

const TopAuthor = (props) => {
    const {theme} = useContext(ThemeContext)
    const renderListItems = (author) => {
        return author.map(item => <TopAuthorItem navigation={props.navigation} item = {item}/>);
    }
    return <View style={Styles.view}>
        <View>
            <Text style = {{fontWeight: 'bold', fontSize: 20, color: theme.foreground}}>{props.title}</Text>
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
