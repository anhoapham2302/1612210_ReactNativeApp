import React, { useContext } from 'react';
import {View, StyleSheet, Image, Text,TouchableOpacity} from 'react-native';
import Star from 'react-native-star-view';
import Colors from '../../../../global/color'
import { AuthContext } from '../../../../provider/auth-provider';
import { AuthorContext } from '../../../../provider/author-provider';
import { getAuthor } from '../../../../core/services/author-service';


const SectionCoursesItem = (props) => {
    const {setAuthor} = useContext(AuthorContext)
    const checkName = () => {
        if(props.item.name){
            return  <Text style = {{fontSize:14}}>{`${props.item.name}`}</Text>
        }else{
            return <Text style = {{fontSize:14}}>{`${props.item['instructor.user.name']}`}</Text>
        }
    }
    const onPressListItem =()=>{   
        setAuthor(getAuthor(props.item.author))
        props.navigation.navigate("CourseDetail", {item: props.item})
    }

                return( <TouchableOpacity style = {styles.item} onPress={onPressListItem}>
                    <Image source={{uri: props.item.imageUrl}} style = {styles.image} />
                    <Text numberOfLines={1} style = {styles.title}>{props.item.title}</Text>
                    {checkName()}
                    <Text style ={{color: 'darkgrey'}}>{`${props.item.videoNumber} video(s) . ${props.item.totalHours} hours`}</Text>
                    <Star score={props.item.ratedNumber} style={styles.starStyle}/>
                </TouchableOpacity>
                )
    
   
};
const styles = StyleSheet.create({
    item:{
        marginTop:5, marginRight:10, marginBottom: 5,
        width: 250,
        height: 220,
        backgroundColor: Colors.backgroundItem,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    image:{
        height: 135, 
        width: 250
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold',
       
    },
    starStyle:{
        width: 100,
        height: 20
    }
})

export default SectionCoursesItem;