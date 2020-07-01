import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Star from 'react-native-star-view';
import { AuthorContext } from '../../../provider/author-provider';
import { getAuthor } from '../../../core/services/author-service';
const ListCoursesItem = (props) => {
    const {setAuthor} = useContext(AuthorContext)
    const onPressListItem =()=>{   
        setAuthor(getAuthor(props.item.author))
        props.navigation.navigate("CourseDetail", {item: props.item})
    }
return (   
    <TouchableOpacity style = {styles.item}  onPress={onPressListItem}>
        <Image source={props.item.image} style = {styles.image} />
        <View style={styles.view}>
        <Text numberOfLines = {1} style = {styles.title}>{props.item.title}</Text>
        <Text style = {{fontSize:14}}>{props.item.author}</Text>
        <Text style ={{color: 'darkgrey'}}>{`${props.item.level} . ${props.item.release.getDate()}/${props.item.release.getMonth()}/${props.item.release.getFullYear()} . ${props.item.duration}`}</Text>
        <Star score={props.item.rating} style={styles.starStyle}/>
        </View>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    view:{
        marginLeft:5
    },
    item: {
        flexDirection: 'row',
    },
    
    image:{
        height: 105, 
        width: 140,
        marginTop:5
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    starStyle:{
        width: 100,
        height: 20
    }
})

export default ListCoursesItem

