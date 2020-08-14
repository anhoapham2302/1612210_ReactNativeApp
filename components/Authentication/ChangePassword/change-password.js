import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "../../../global/style";
import Colors from "../../../global/color";
import { AuthContext } from "../../../provider/auth-provider";
import {changePassword} from "../../../action/auth-action"
import { ActivityIndicator } from "react-native-paper";
import { LanguageContext } from "../../../provider/language-provider";

const ChangePassword = (props) => {
  const {language} = useContext(LanguageContext);
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
          Alert.alert(language.pleaseOPass)
      }else{
          if(npassword === ''){
              Alert.alert(language.pleaseNPass)
          }else{
              if(cpassword === ''){
                  Alert.alert(language.pleaseCPass)
              }else{
                  if(npassword !== cpassword){
                      Alert.alert(language.notMatched)
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
            Alert.alert(language.success)
            props.navigation.navigate("Login")
        }else{
            if(status === 400){
                Alert.alert(language.errorChangePass)
            }else{
                Alert.alert(language.serverError)
            }
        }
    }
}, [loading])
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={loading}/>
  <Text style = {[Styles.title, {color: Colors.changePassword}]}>{language.changePassword}</Text>
      <TextInput
        style={[Styles.text_input, {borderBottomColor: Colors.changePassword}]}
        placeholder={language.opassword}
        secureTextEntry
        onChangeText={(opassword) => setOPassword(opassword)}
      />
      <TextInput
        style={[Styles.text_input, {borderBottomColor: Colors.changePassword}]}
        placeholder={language.npassword}
        secureTextEntry
        onChangeText={(npassword) => setNPassword(npassword)}
      />
      <TextInput
        style={[Styles.text_input, {borderBottomColor: Colors.changePassword}]}
        placeholder={language.cpassword}
        secureTextEntry
        onChangeText={(cpassword) => setCPassword(cpassword)}
      />
      <TouchableOpacity style={[Styles.button_reg, {backgroundColor: Colors.changePassword}]} onPress={onButtonClick}>
        <Text style={Styles.button_text}>{language.changePassword}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
