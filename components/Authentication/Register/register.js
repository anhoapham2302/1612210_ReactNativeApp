import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Styles from "../../../global/style";
import Colors from "../../../global/color";
import { register } from "../../../action/auth-action";
import { LanguageContext } from "../../../provider/language-provider";
const Register = (props) => {
  const onPressSignUp = () => {
    props.navigation.navigate("Main");
  };
  const onPressSignIn = () => {
    props.navigation.navigate("Login");
  };
  const {language} = useContext(LanguageContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const [registerProcess, setRegisterProcess] = useState(false);

  const checkLoading = res => {
    if(res !== undefined)
    {
      setStatus(res);
      setLoading(false);
    }
  }

  const checkInputRequired = () => {
    if (name === "") {
      Alert.alert(language.pleaseName);
    } else {
      if (email === "") {
        Alert.alert(language.pleaseEmail);
      } else {
        if (phone === "") {
          Alert.alert(language.pleasePhone);
        } else {
          if (password === "") {
            Alert.alert(language.pleasePass);
          } else {
            if (cpassword === "") {
              Alert.alert(language.pleaseCPass);
            } else {
                if(password !== cpassword){
                    Alert.alert(language.notMatched)
                }else{
                    setLoading(true)
                    setRegisterProcess(true)
                    register(name, email, phone, password, checkLoading)
                }
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    if(loading === false && registerProcess === true){
      setRegisterProcess(false)
      if(status === 400){
        Alert.alert(language.emailExisted);
      }else{
        if(status === 200){
          Alert.alert(language.checkEmail);
          props.navigation.navigate("Login");
        }else{
          Alert.alert(language.serverError);
        }
      }
     
    }
  }, [loading])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={loading}/>
  <Text style = {[Styles.title, {color: Colors.register}]}>{language.register}</Text>

      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(name) => setName(name)}
        placeholder={language.name}
      />
      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
      />
      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(phone) => setPhone(phone)}
        keyboardType="number-pad"
        placeholder={language.phone}
      />
      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry       
        placeholder={language.password}
      />
      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(cpassword) => setcPassword(cpassword)}
        secureTextEntry       
        placeholder={language.cpassword}
      />
      <TouchableOpacity style={Styles.button_reg} onPress={checkInputRequired}>
  <Text style={Styles.button_text}>{language.register}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={onPressSignIn}>
  <Text style={{ color: "darkgrey" }}>{language.haveAcc}?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
