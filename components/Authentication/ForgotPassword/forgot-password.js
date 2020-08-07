import React,{useState} from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import Styles from '../../../global/style'
import Colors from '../../../global/color'
const ForgotPassword = (props) => {
    const onPress =()=>{
        props.navigation.navigate("Login")
    }
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style = {[Styles.title, {color: Colors.forgotPassword}]}>Forgot Password</Text>
        <TextInput
          style={[Styles.text_input, {borderColor: Colors.forgotPassword}]}
          placeholder="Email"
        />
        <TouchableOpacity
          style={[Styles.button, {backgroundColor: Colors.forgotPassword}]}
          onPress={() => {
          }}
        >
        <Text style={Styles.button_text}>Send Email</Text>
        </TouchableOpacity>
      </View>
    )   
}

export default ForgotPassword
