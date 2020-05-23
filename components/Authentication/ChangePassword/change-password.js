import React,{useState} from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../global/style'
const ChangePassword = (props) => {
    const onPressSignIn =()=>{
        props.navigation.navigate("Login")
    }
    return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <TextInput style={Styles.text_input}  placeholder = 'Old password'/>   
                <TextInput style={Styles.text_input}  placeholder = 'New password'/>
                <TextInput style={Styles.text_input}  placeholder = 'Confirm password'/>
                <TouchableOpacity style={Styles.button_reg} onPress={onPressSignIn}>
                    <Text style={Styles.button_text}>Change Password</Text>
                </TouchableOpacity>
            </View>  
    )   
}

export default ChangePassword
