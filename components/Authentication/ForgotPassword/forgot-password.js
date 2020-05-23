import React,{useState} from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import Styles from '../../../global/style'
const ForgotPassword = () => {
    return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <TextInput style={Styles.text_input}  placeholder = 'Email'/>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
                <TextInput style={Styles.code_input}  placeholder = 'Code'/>
                <TouchableOpacity style={Styles.button_code}>
                    <Text style={{textAlign:"center", paddingTop:4, color:'white'}}>Send code</Text>
                </TouchableOpacity>
                </View>   
                <TouchableOpacity style={Styles.button_reg}>
                    <Text style={Styles.button_text}>OK</Text>
                </TouchableOpacity>
            </View>  
    )   
}

export default ForgotPassword
