import React, {useContext} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TopAuthor from '../../Main/Browse/TopAuthor/top-author'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../../provider/auth-provider';


const AccountProfile = (props) => {
    const {auth} = useContext(AuthContext)
    const onPressSignOut =()=>{
        props.navigation.navigate("Login")
    }
    const onPressChangePassword =()=>{
        props.navigation.navigate("ChangePassword")
    }

    
    return (
        
        <View style={{marginTop:20}}>
        <View style={styles.item}>
            <Image source={auth.user.avatar} style = {styles.image} />
            <View style={styles.text}>
        <Text style={styles.name}>{auth.user.fullname}</Text>
            </View>
        </View>
        <View style={{margin:10}}>
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
            <TopAuthor navigation={props.navigation}/>
        </View>
        <TouchableOpacity style={{width:120, margin:10}} onPress={onPressSignOut}>
            <Icon.Button name="sign-out" style={{backgroundColor:'red'}}>
            <Text style={{fontSize: 17, color:'white'}}>
                Sign Out
                </Text>
            </Icon.Button>
        </TouchableOpacity>
        <TouchableOpacity style={{width:190, margin:10}} onPress={onPressChangePassword}>
            <Icon.Button name="reply" style={{backgroundColor:'blue'}}>
            <Text style={{fontSize: 17, color:'white'}}>
                Change Password
                </Text>
            </Icon.Button>
        </TouchableOpacity>
        </View>
    )
 
   
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        margin:10,
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

