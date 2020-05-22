import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

const SearchInput = (props) => {
    return <View style = {{flexDirection:'row', marginTop:70, marginHorizontal:5}}>
    <TextInput style = {styles.search} placeholder = 'Search input...'/>           
    <TouchableOpacity style={styles.button}>
    <Text style={styles.text}>Search</Text>
    </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    search:{
        flex: 1, 
        borderBottomWidth: 0.5, 
        fontSize:17,
    },
    button:{
        width: 70,
        height: 35,
    },
    text:{
        color:'blue', 
        fontSize:17, 
        paddingTop:5, 
        textAlign:'center'
    }
})

export default SearchInput
