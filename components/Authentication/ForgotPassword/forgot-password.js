import React,{useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import Styles from '../../../global/style'
import Colors, { forgotPassword } from '../../../global/color'
import { sendEmailForgotPassword } from '../../../action/auth-action'
const ForgotPassword = (props) => {
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
            Alert.alert("Vui lòng nhập email")
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
                Alert.alert("Vui lòng kiểm tra email để lấy lại mật khẩu.")
            }else{
                if(status === 400){
                    Alert.alert("Email bạn nhập chưa được đăng ký.")
                }else{
                    Alert.alert("Hệ thống gặp lỗi khi gửi email. Vui lòng thử lại")
                }
            }
        }
    }, [loading])
    
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator animating={loading}/>
        <Text style = {[Styles.title, {color: Colors.forgotPassword}]}>Forgot Password</Text>
        <TextInput
          style={[Styles.text_input, {borderColor: Colors.forgotPassword}]}
          placeholder="Email"
          onChangeText={(email)=>setEmail(email)}
        />
        <TouchableOpacity
          style={[Styles.button, {backgroundColor: Colors.forgotPassword}]}
          onPress={onPress}
        >
        <Text style={Styles.button_text}>Send Email</Text>
        </TouchableOpacity>
      </View>
    )   
}

export default ForgotPassword
