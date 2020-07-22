import React, {useContext} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import TopAuthor from '../../Main/Browse/TopAuthor/top-author'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../../provider/auth-provider';
import ListCourses from '../../Courses/ListCourses/list-courses';
import { FavContext } from '../../../provider/favorite-provider';
import { ThemeContext } from '../../../provider/theme-provider';
import { themes } from '../../../global/theme';
import { CoursesContext } from '../../../provider/course-provider';


const AccountProfile = (props) => {
    const {theme, setTheme} = useContext(ThemeContext)
    const {state} = useContext(AuthContext)

    const onPressSignOut =()=>{
        props.navigation.navigate("Login")
    }
    const onPressChangePassword =()=>{
        props.navigation.navigate("ChangePassword")
    }

    return (
        <ScrollView style={{marginTop:0, backgroundColor: theme.background}}>
        <View style={styles.item}>
            <Image source={{uri: state.userInfo.avatar}} style = {styles.image} />
            <View style={styles.text}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.foreground}}>{state.userInfo.name}</Text>
            </View>
        </View>
        {/* <View style={{margin:10}}>
            <Text style={styles.profile_text}>Type:</Text>
            <Text style={styles.profile_text1}>Premium</Text>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.profile_text}>Date active:</Text>
            <Text style={styles.profile_text1}>May 20, 2020</Text>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.profile_text}>Most view subject:</Text>
            <Text style={styles.profile_text1}>React Native</Text>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.profile_text}>Favorite authors:</Text>
            <ListCourses com = 'Downloads' navigation={props.navigation}/>
        </View> */}
         <TouchableOpacity style={{width:120, margin:10}} onPress={onPressSignOut}>
            <Icon.Button name="sign-out" style={{backgroundColor:'red'}}>
            <Text style={{fontSize: 17, color:'white'}}>
               Sign Out
            </Text>
            </Icon.Button>
        </TouchableOpacity>
        <TouchableOpacity style={{width:190, margin:10}} onPress={()=>{ 
            if(theme === themes.light)
                setTheme(themes.dark)
            else
                setTheme(themes.light)
        }}>
            <Icon.Button name="reply" style={{backgroundColor:'blue'}}>
            <Text style={{fontSize: 17, color:'white'}}>
                Change Theme
                </Text>
            </Icon.Button>
        </TouchableOpacity>
        </ScrollView>
    )
 
   
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        marginLeft: 10,
        borderBottomWidth: 0.5,
    },
    image:{
        height: 80,
        width: 80,
        borderRadius: 40,
        marginTop:5
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    text:{
        paddingLeft: 10,
        paddingTop:30
    },
    profile_text:{
        fontSize:17,
        color: 'darkgrey'
    },
    profile_text1:{
        fontSize:20,
        marginLeft: 20
    }
})

export default AccountProfile

