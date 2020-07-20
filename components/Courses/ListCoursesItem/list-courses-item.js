import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Star from 'react-native-star-view';
import { AuthorContext } from '../../../provider/author-provider';
import { getAuthor } from '../../../core/services/author-service';
import { ThemeContext } from '../../../provider/theme-provider';

const ListCoursesItem = (props) => {
    const {theme} = useContext(ThemeContext)
    const {setAuthor} = useContext(AuthorContext)
    const onPressListItem =()=>{   
        setAuthor(getAuthor(props.item.author))
        props.navigation.navigate("CourseDetail", {item: props.item})
    }
    const checkPrice = (price) => {
        if(price === 0){
            return <Text style = {{fontSize: 17, color: 'red', fontWeight: 'bold'}}>Miễn phí</Text>
        }else{
            return <Text style = {{fontSize: 17, color: 'red', fontWeight: 'bold'}}>{price}</Text>
        }
    }
    const checkType = () => {
        if(props.item.courseTitle)
        {   
            return (<TouchableOpacity style = {styles.item}  onPress={onPressListItem}>
                <Image source={{uri: props.item.courseImage}} style = {styles.image} />
                <View style={styles.view}>
                <Text numberOfLines = {1} style = {{fontSize: 17, fontWeight: 'bold', marginBottom: 1}}>{props.item.courseTitle}</Text>
                <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{`${props.item.instructorName}`}</Text>
                <Star score={props.item.courseAveragePoint} style={styles.starStyle}/>    
                <Text style = {{fontSize: 17, fontWeight: 'bold', color: '#62DDBD', marginBottom: 1}}>{props.item.courseSoldNumber} Học viên</Text>
                {checkPrice(props.item.coursePrice)}
                </View>
            </TouchableOpacity>)
        }
        else
        {
            return (   
                <TouchableOpacity style = {styles.item}  onPress={onPressListItem}>
                    <Image source={{uri: props.item.imageUrl}} style = {styles.image} />
                    <View style={styles.view}>
                    <Text numberOfLines = {1} style = {{fontSize: 17, fontWeight: 'bold', marginBottom: 1}}>{props.item.title}</Text>
                    <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{`${props.item['instructor.user.name']}`}</Text>
                    <Star score={(props.item.contentPoint + props.item.formalityPoint + props.item.presentationPoint)/3} style={styles.starStyle}/>
                    <Text style = {{fontSize: 17, fontWeight: 'bold', color: '#62DDBD', marginBottom: 1}}>{props.item.soldNumber} Học viên</Text>
                    {checkPrice(props.item.price)}
                    </View>
                </TouchableOpacity>)
        }
    }
return (
    <View>
        {checkType()}
    </View>
    )
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
        width: 110,
        height: 20,
        marginBottom: 2
    }
})

export default ListCoursesItem

