import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Star from 'react-native-star-view';
import Colors from '../../../global/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../../provider/auth-provider';
import { FavContext } from '../../../provider/favorite-provider';

const VideoDescription = (props) => {
    const {auth} = useContext(AuthContext)
    const {setFav} = useContext(FavContext)
    const addFavorite = () => {
        auth.user.fav_courses.push(props.item)
        setFav(auth.user.fav_courses)
    }
    
    const onPressListItem =()=>{
        props.navigation.navigate("AuthorProfile", {item: [
            {
                id: 1,
                name: props.item.author
            }
        ]})
    }
    return (
        <View style={{marginHorizontal:17}}>
            <Text style = {styles.title}>{props.item.title}</Text>
            <TouchableOpacity style={styles.author} onPress={onPressListItem}>
            <View style={styles.view}>
            <Image source={{uri: 'https://lucloi.vn/wp-content/uploads/2020/03/90443889_1016737482055036_219143065531580416_n.jpg'}} style = {styles.image} />
            <Text style={styles.text}>{props.item.author}</Text>
            </View> 
            </TouchableOpacity>
            <View style={styles.view}>
            <Text style ={{color: 'darkgrey'}}>{`${props.item.level} . ${props.item.release} . ${props.item.duration}`}</Text>
            <Star score={4} style={styles.starStyle}/>
            </View>
            <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20, marginHorizontal:30}}>
            <TouchableOpacity>
            <Icon.Button name="bookmark" backgroundColor='red'>
            <Text style={{ fontSize: 15, color:'#fff'}}>
             Bookmark
             </Text>
            </Icon.Button>
            </TouchableOpacity>
            <TouchableOpacity onPress = {addFavorite}>
            <Icon.Button name="download">
            <Text style={{ fontSize: 15,color:'#fff' }}>
             Download
             </Text>
            </Icon.Button>
            </TouchableOpacity>
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
