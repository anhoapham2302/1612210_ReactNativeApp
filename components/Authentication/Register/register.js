import React,{useState} from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../global/style'
const Register = () => {
    return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <TextInput style={Styles.text_input}  placeholder = 'Email'/>   
                <TextInput style={Styles.text_input}  placeholder = 'Password'/>
                <TextInput style={Styles.text_input}  placeholder = 'Confirm password'/>
                <TouchableOpacity style={Styles.button_reg}>
                    <Text style={Styles.button_text}>Sign Up</Text>
                </TouchableOpacity>
            <TouchableOpacity  style={{marginTop:10}}>
                <Text style={{color:'darkgrey'}}>Already have account?</Text>
            </TouchableOpacity>
            </View>  
    )   
}

export default Register
