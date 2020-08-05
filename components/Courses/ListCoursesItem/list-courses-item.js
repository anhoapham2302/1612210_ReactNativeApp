import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Star from 'react-native-star-view';
import { ThemeContext } from '../../../provider/theme-provider';
import { apiAuthorDetail } from '../../../core/services/author-service';

const ListCoursesItem = (props) => {
    const {theme} = useContext(ThemeContext)
    const [author, setAuthor] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(props.item.name === undefined & props.item['instructor.user.name'] === undefined){
            apiAuthorDetail(props.item.instructorId)
            .then(respone => respone.json())
            .then(res => setAuthor(res.payload))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
        }else{
            setLoading(false)
        }
    }, [])
    const onPressListItem =()=>{   
        props.navigation.navigate("CourseDetail", {item: props.item})
    }

    const checkPrice = (price) => {
        if(price === 0){
            return <Text style = {{fontSize: 17, color: 'red', fontWeight: 'bold'}}>Miễn phí</Text>
        }else{
            return <Text style = {{fontSize: 17, color: 'red', fontWeight: 'bold'}}>{price} VNĐ</Text>
        }
    }
    const checkName = () => {
        if(props.item.name){
            return  <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{`${props.item.name}`}</Text>
        }else{
            if(props.item['instructor.user.name']){
                return <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{`${props.item['instructor.user.name']}`}</Text>
            }else{
            return <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{author.name}</Text>
            }
        }
    }
    const checkType = () => {
        if(props.item.courseTitle)
        {   
            return (<TouchableOpacity style = {styles.item}  onPress={onPressListItem}>
                <Image source={{uri: props.item.courseImage}} style = {styles.image} />
                <View style={styles.view}>
                <Text numberOfLines = {1} style = {{fontSize: 17, fontWeight: 'bold', marginBottom: 1, color: theme.foreground}}>{props.item.courseTitle}</Text>
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
                    <Text numberOfLines = {1} style = {{fontSize: 17, fontWeight: 'bold', marginBottom: 1, color: theme.foreground}}>{props.item.title}</Text>
                    {checkName()}
                    <Star score={(props.item.contentPoint + props.item.formalityPoint + props.item.presentationPoint)/3} style={styles.starStyle}/>
                    <Text style = {{fontSize: 17, fontWeight: 'bold', color: '#62DDBD', marginBottom: 1}}>{props.item.soldNumber} Học viên</Text>
                    {checkPrice(props.item.price)}
                    </View>
                </TouchableOpacity>)
        }
    }
return (
    <View>
        {loading ? <ActivityIndicator/> : checkType()}
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

