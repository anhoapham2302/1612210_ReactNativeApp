import React,{useState} from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../global/style'
const Register = (props) => {
    const onPressSignUp =()=>{
        props.navigation.navigate("Main")
    }
    const onPressSignIn =()=>{
        props.navigation.navigate("Login")
    }
    return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <TextInput style={Styles.text_input}  placeholder = 'Email'/>   
                <TextInput style={Styles.text_input}  placeholder = 'Password'/>
                <TextInput style={Styles.text_input}  placeholder = 'Confirm password'/>
                <TouchableOpacity style={Styles.button_reg} onPress={onPressSignUp}>
                    <Text style={Styles.button_text}>Sign Up</Text>
                </TouchableOpacity>
            <TouchableOpacity  style={{marginTop:10}} onPress={onPressSignIn}>
                <Text style={{color:'darkgrey'}}>Already have account?</Text>
            </TouchableOpacity>
            </View>  
    )   
}

export default Register
