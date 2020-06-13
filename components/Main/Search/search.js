import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import ListCourses from '../../Courses/ListCourses/list-courses'
import { searchCourse } from '../../../core/services/search-service'
import { set } from 'react-native-reanimated'

const Search = (props) => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState()
    
    const renderCourses = (text) => {
        if(status){
            return (
                <ListCourses title = 'Courses' text = {text} navigation={props.navigation}/>  
            )
        }
    }

   
    return(<ScrollView>
            <View style = {{flexDirection:'row', marginTop:70, marginHorizontal:17}}>
                <TextInput  style = {styles.search}
                            onChangeText={text=>setText(text)}
                            placeholder = 'Search input...'/>           
                <TouchableOpacity style={styles.button} onPress={()=>{
                    setStatus(200)
                }}>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
            </View>
            {renderCourses(text)}
    </ScrollView>) 
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

export default Search