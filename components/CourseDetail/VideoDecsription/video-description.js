import React, { useContext, useState } from 'react'
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
import { useIsFocused } from '@react-navigation/native';

let clickFavButton = 0
let clickBMButton = 0

const VideoDescription = (props) => {

    const {auth} = useContext(AuthContext)
    const {setFav} = useContext(FavContext)
    const {fav} = useContext(FavContext)
    const {setBookmark} = useContext(BookmarkContext)
    const {bookmark} = useContext(BookmarkContext)
    const {author} = useContext(AuthorContext)
    const [statusBM, setStatusBM] = useState()
    const [statusFav, setStatusFav] = useState()
    const addFavorite = () => {
        clickFavButton++
        auth.user.fav_courses.push(props.item)
        setFav(auth.user.fav_courses)
        setStatusFav(clickFavButton)
    }
    const removeFavorite= () => {
        clickFavButton--
        auth.user.fav_courses.splice(auth.user.fav_courses.indexOf(props.item), 1)
        setFav(auth.user.fav_courses)
        setStatusFav(clickFavButton)
    }
    const addBookmark = () => {
        clickBMButton++
        auth.user.bookmark_courses.push(props.item)
        setBookmark(auth.user.bookmark_courses)
        setStatusBM(clickBMButton)


    }
    const removeBookmark = () => {
        clickBMButton--
        auth.user.bookmark_courses.splice(auth.user.bookmark_courses.indexOf(props.item), 1)
        setBookmark(auth.user.bookmark_courses)
        setStatusBM(clickBMButton)
 

    }
    const onPressListItem =()=>{
        props.navigation.navigate("AuthorProfile", {item: author})
    }
    const isExistFavorite = () => {
        for(let i = 0; i < fav.length; i++)
        {
            if(fav[i].id === props.item.id){
                return true
            }
        }
        return false
    }
    const isExistBookmark = () => {
        for(let i = 0; i < bookmark.length; i++)
        {
            if(bookmark[i].id === props.item.id){
                return true
            }
        }
        return false
    }
    const renderFavButton = () => {
        if(isExistFavorite() === true){
            return (
                <TouchableOpacity onPress = {removeFavorite}>
                <Icon.Button name="heart" backgroundColor='red'>
                <Text style={{ fontSize: 12,color:'#fff' }}>
                Remove Favorite
                </Text>
                </Icon.Button>
                </TouchableOpacity>
            )
        }
        if(isExistFavorite() === false){
            return (
                <TouchableOpacity onPress = {addFavorite}>
                <Icon.Button name="heart" backgroundColor='red'>
                <Text style={{ fontSize: 15, color:'#fff'}}>
                 Favorite
                </Text>
                </Icon.Button>
                </TouchableOpacity>
            )
        }
    }
    const renderAddBookmarkButton = () => {
        if(isExistBookmark() === true){
            return (
                <TouchableOpacity onPress = {removeBookmark}>
                <Icon.Button name="bookmark" backgroundColor='orange'>
                <Text style={{ fontSize: 12, color:'#fff'}}>
                 Remove Bookmark
                 </Text>
                </Icon.Button>
                </TouchableOpacity>
            )
        }
        if(isExistBookmark() === false){
            return (
                <TouchableOpacity onPress = {addBookmark}>
                <Icon.Button name="bookmark" backgroundColor='orange'>
                <Text style={{ fontSize: 15, color:'#fff'}}>
                 Bookmark
                 </Text>
                </Icon.Button>
                </TouchableOpacity>
            )
        }
    }
    return (
        <View style={{marginHorizontal:17}}>
            <Text style = {styles.title}>{props.item.title}</Text>
            <TouchableOpacity style={styles.author} onPress={onPressListItem}>
            <View style={styles.view}>
            <Image source={author.avatar} style = {styles.image} />
            <Text style={styles.text}>{props.item.author}</Text>
            </View> 
            </TouchableOpacity>
            <View style={styles.view}>
            <Text style ={{color: 'darkgrey'}}>{`${props.item.level} . ${props.item.release.getDate()}/${props.item.release.getMonth()}/${props.item.release.getFullYear()} . ${props.item.duration}`}</Text>
            <Star score={4} style={styles.starStyle}/>
            </View>
            <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20, marginHorizontal:30}}>
            {renderAddBookmarkButton()}
            {renderFavButton()}
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
        height: 35,
        width: 35,
        borderRadius: 17.5,
    },
    starStyle:{
        marginLeft:5,
        width: 80,
        height: 17
    }
}
export default VideoDescription
