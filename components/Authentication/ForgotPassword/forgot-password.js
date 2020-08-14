import React,{useState, useEffect, useContext} from 'react'
import {Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import Styles from '../../../global/style'
import Colors, { forgotPassword } from '../../../global/color'
import { sendEmailForgotPassword } from '../../../action/auth-action'
import { LanguageContext } from '../../../provider/language-provider'
const ForgotPassword = (props) => {
    const {language} = useContext(LanguageContext);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState()
    const [loading, setLoading] = useState(false);
    const [sendEmailProcess, setSendEmailProcess] = useState(false);

    const checkLoading = res =>{
        if(res !== undefined){
            setStatus(res)
            setLoading(false)
        }
    }
    const onPress =()=>{
        if(email === "")
        {
            Alert.alert(language.pleaseEmail)
        }else{
            setLoading(true);
            setSendEmailProcess(true);
            sendEmailForgotPassword(email, checkLoading)
        }
    }

    useEffect(() => {
        if(loading === false && sendEmailProcess === true)
        {
            setSendEmailProcess(false);
            if(status === 200)
            {
                Alert.alert(language.checkEmail)
            }else{
                if(status === 400){
                    Alert.alert(language.emailNoRegister)
                }else{
                    Alert.alert(language.serverError)
                }
            }
        }
    }, [loading])
    
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator animating={loading}/>
    <Text style = {[Styles.title, {color: Colors.forgotPassword}]}>{language.forgotPassword}</Text>
        <TextInput
          style={[Styles.text_input, {borderColor: Colors.forgotPassword}]}
          placeholder="Email"
          onChangeText={(email)=>setEmail(email)}
        />
        <TouchableOpacity
          style={[Styles.button, {backgroundColor: Colors.forgotPassword}]}
          onPress={onPress}
        >
        <Text style={Styles.button_text}>{language.sendEmail}</Text>
        </TouchableOpacity>
      </View>
    )   
}

export default ForgotPassword
