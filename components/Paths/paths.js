import React from 'react'
import { StyleSheet, Text, View, ScrollView ,Image} from 'react-native'
import ListCourses from '../Courses/ListCourses/list-courses'

const Paths = (props) => {
    let item = props.route.params.item
    return (
        <ScrollView>
             <Image source={{uri: 'https://cdn.dribbble.com/users/66221/screenshots/1655593/html5.png'}} style = {styles.image} />
             <ListCourses navigation={props.navigation} title={item.name}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 250
    }
})
export default Paths
