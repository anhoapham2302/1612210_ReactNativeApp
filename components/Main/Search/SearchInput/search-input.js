import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

const SearchInput = (props) => {
    return <View style = {{flexDirection:'row', margin:5}}>
    <TextInput style = {styles.search} placeholder = 'Search input...'/>           
    <TouchableOpacity style={styles.button}>
    <Text style={{color:'white', fontWeight:'bold', fontSize:15, paddingTop:5, textAlign:'center'}}>Search</Text>
    </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    search:{
        flex: 1, 
        borderWidth: 0.5, 
        fontSize:20,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5
    },
    button:{
        borderWidth: 0.5, 
        width: 70,
        height: 35,
        backgroundColor: 'royalblue',
        borderTopRightRadius:5,
        borderBottomRightRadius:5
    }
})

export default SearchInput
