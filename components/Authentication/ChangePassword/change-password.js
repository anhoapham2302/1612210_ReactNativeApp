import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "../../../global/style";
import Colors from "../../../global/color";
import { AuthContext } from "../../../provider/auth-provider";
import {changePassword} from "../../../action/auth-action"
import { ActivityIndicator } from "react-native-paper";

const ChangePassword = (props) => {
    const {state} = useContext(AuthContext)
  const [opassword, setOPassword] = useState("");
  const [npassword, setNPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(false);
  const [changePasswordProcess, setChangePasswordProcess] = useState(false);

  const checkLoading = res =>{
    if(res !== undefined){
        setStatus(res)
        setLoading(false)
    }
}

  const onButtonClick = () => {
      if(opassword === ''){
          Alert.alert('Vui lòng nhập mật khẩu cũ')
      }else{
          if(npassword === ''){
              Alert.alert('Vui lòng nhập mật khẩu mới')
          }else{
              if(cpassword === ''){
                  Alert.alert('Vui lòng xác nhận mật khẩu mới')
              }else{
                  if(npassword !== cpassword){
                      Alert.alert('Mật khẩu mới không trùng khớp')
                  }else{
                    setLoading(true);
                    setChangePasswordProcess(true);
                    changePassword(state.token, state.userInfo.id, opassword, npassword, checkLoading)
                  }
              }
          }
      }
  }

  useEffect(() => {
    if(loading === false && changePasswordProcess === true)
    {
        setChangePasswordProcess(false);
        if(status === 200)
        {
            Alert.alert("Mật khẩu đã được đổi")
            props.navigation.navigate("Login")
        }else{
            if(status === 400){
                Alert.alert("Mật khẩu cũ không đúng hoặc không giống mật khẩu mới")
            }else{
                Alert.alert("Hệ thống gặp lỗi khi đổi mật khẩu")
            }
        }
    }
}, [loading])
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={loading}/>
        <Text style = {[Styles.title, {color: Colors.changePassword}]}>Change Password</Text>
      <TextInput
        style={[Styles.text_input, {borderBottomColor: Colors.changePassword}]}
        placeholder="Old password"
        secureTextEntry
        onChangeText={(opassword) => setOPassword(opassword)}
      />
      <TextInput
        style={[Styles.text_input, {borderBottomColor: Colors.changePassword}]}
        placeholder="New password"
        secureTextEntry
        onChangeText={(npassword) => setNPassword(npassword)}
      />
      <TextInput
        style={[Styles.text_input, {borderBottomColor: Colors.changePassword}]}
        placeholder="Confirm password"
        secureTextEntry
        onChangeText={(cpassword) => setCPassword(cpassword)}
      />
      <TouchableOpacity style={[Styles.button_reg, {backgroundColor: Colors.changePassword}]} onPress={onButtonClick}>
        <Text style={Styles.button_text}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
