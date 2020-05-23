import React,{useState} from 'react'
import { Image, Text, View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../global/style'
const Login = () => {
    return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <TextInput style={Styles.text_input}  placeholder = 'Email'/>   
                <TextInput style={Styles.text_input}  placeholder = 'Password'/>
                <TouchableOpacity style={Styles.button}>
                    <Text style={Styles.button_text}>Login</Text>
                </TouchableOpacity>
            <TouchableOpacity style={{width:300, marginTop:20}}>
            <Icon.Button name="facebook">
            <Text style={{fontSize: 17, paddingLeft:45, color:'white'}}>
             Login with Facebook
             </Text>
            </Icon.Button>
            </TouchableOpacity>
            <TouchableOpacity style={{width:300, marginTop:20, marginBottom:20}}>
            <Icon.Button name="envelope" style={{backgroundColor:'red'}}>
            <Text style={{fontSize: 17, paddingLeft:55, color:'white'}}>
             Login with Gmail
             </Text>
            </Icon.Button>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button_reg}>
                    <Text style={Styles.button_text}>Sign Up</Text>
                </TouchableOpacity>
            <TouchableOpacity  style={{marginTop:10}}>
                <Text style={{color:'darkgrey'}}>Forgot password?</Text>
            </TouchableOpacity>
            </View>  
    )   
}

export default Login
