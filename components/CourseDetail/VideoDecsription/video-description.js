import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Star from 'react-native-star-view';
import Colors from '../../../global/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../../provider/auth-provider';
import { FavContext } from '../../../provider/favorite-provider';
import { AuthorContext } from '../../../provider/author-provider';
import { BookmarkContext } from '../../../provider/bookmark-provider';
import courses from '../../../global/courses';
import { apiCourseDetails } from '../../../core/services/course-service';
import { CoursesContext } from '../../../provider/course-provider';

const VideoDescription = (props) => {
    const {courses} = useContext(CoursesContext)
    const [data, setData] = useState([])
    const [status, setStatus] = useState()

    useEffect(() => {
       apiCourseDetails(props.item.id)
       .then((response) => response.json())
       .then((data) => {
        setData(data.payload)})
       .catch((error) => console.log(error))
    }, [])

//     const checkName = () => {
//         if(props.item.name){
//             return  <Text style = {styles.text}>{`${props.item.name}`}</Text>
//         }else{
//             return <Text style = {styles.text}>{`${props.item['instructor.user.name']}`}</Text>
//         }
//     }
//     const addFavorite = () => {
      
//     }
//     const removeFavorite= () => {
     
//     }
 
    const renderFavButton = () => {
        return (
            <TouchableOpacity style = {{width:130, borderWidth: 2, borderRadius: 5, borderColor: 'red'}}>
            <Icon.Button name="heart" backgroundColor='#fff' color = 'red'>
            <Text style={{ fontSize: 17, fontWeight: 'bold',color:'red' }}>
            Favorite
            </Text>
            </Icon.Button>
            </TouchableOpacity>
        )
    }

    const renderUnFavButton = () => {
        return (
            <TouchableOpacity style = {{width:130, borderWidth: 0, borderRadius: 5, borderColor: 'red'}}>
            <Icon.Button name="heart" backgroundColor='red' color = '#fff'>
            <Text style={{ fontSize: 17, fontWeight: 'bold',color:'#fff' }}>
            Favorited
            </Text>
            </Icon.Button>
            </TouchableOpacity>
        )
    }

    const checkFav = () => {
        for(let i = 0; i < courses.data.length; i++){
            if(courses.data[i].id === data.id)
            {
                return renderUnFavButton()
            }
        }
        return renderFavButton()
    }
// const renderAddBookmarkButton = () => {
//         return (
//             <TouchableOpacity onPress = {removeBookmark}>
//             <Icon.Button name="bookmark" backgroundColor='orange'>
//             <Text style={{ fontSize: 12, color:'#fff'}}>
//                 Remove Bookmark
//                 </Text>
//             </Icon.Button>
//             </TouchableOpacity>
//         )
//     }
    return (
        <View>
             <Image source={{uri: data.imageUrl}} style = {styles.image} />
             <View style={{marginHorizontal:17}}>
                <Text style = {styles.title}>{data.title}</Text>
                <View style={styles.view}>
                <Text style ={{color: 'darkgrey'}}>{`${data.videoNumber} video(s) . ${data.totalHours} hours`}</Text>
                <Star score={(data.contentPoint + data.formalityPoint + data.presentationPoint)/3} style={styles.starStyle}/>
            </View>
            <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20, marginHorizontal:30}}>
                {checkFav()}
            </View>
        </View>
        </View>
    )
}

const styles ={
    view:{
        flexDirection: 'row',
    },
    title:{
        fontSize: 24,      
    },
    author:{
        height:35,
        width: 200,
        backgroundColor: Colors.backgroundItem,
        borderRadius:10,
        marginTop:5,
        marginRight:5
    },
    text:{
        fontSize: 17,
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight:10
    },
    image:{
        width: '100%',
        height: 250
    },
    starStyle:{
        marginLeft:5,
        width: 80,
        height: 17
    }
}
export default VideoDescription
