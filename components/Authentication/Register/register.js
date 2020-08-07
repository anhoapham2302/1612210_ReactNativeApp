import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Styles from "../../../global/style";
import Colors from "../../../global/color";
import { register } from "../../../action/auth-action";
const Register = (props) => {
  const onPressSignUp = () => {
    props.navigation.navigate("Main");
  };
  const onPressSignIn = () => {
    props.navigation.navigate("Login");
  };
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
      Alert.alert("Please Enter Name");
    } else {
      if (email === "") {
        Alert.alert("Please Enter Email");
      } else {
        if (phone === "") {
          Alert.alert("Please Enter Phone Number");
        } else {
          if (password === "") {
            Alert.alert("Please Enter Password");
          } else {
            if (cpassword === "") {
              Alert.alert("Please Enter Confirm Password");
            } else {
                if(password !== cpassword){
                    Alert.alert("Password And Confirm Password Are Not Match")
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
        Alert.alert("Email hoặc số điện thoại đã được sử dụng.");
      }else{
        if(status === 200){
          Alert.alert("Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.");
          props.navigation.navigate("Login");
        }else{
          Alert.alert("Hệ thống gặp lỗi khi đăng ký. Vui lòng thử lại sau.");
        }
      }
     
    }
  }, [loading])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={loading}/>
            <Text style = {[Styles.title, {color: Colors.register}]}>Register</Text>

      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(name) => setName(name)}
        placeholder="Name"
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
        placeholder="Phone number"
      />
      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry       
        placeholder="Password"
      />
      <TextInput
        style={[Styles.text_input, {borderColor: Colors.register}]}
        onChangeText={(cpassword) => setcPassword(cpassword)}
        secureTextEntry       
        placeholder="Confirm password"
      />
      <TouchableOpacity style={Styles.button_reg} onPress={checkInputRequired}>
        <Text style={Styles.button_text}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={onPressSignIn}>
        <Text style={{ color: "darkgrey" }}>Already have account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
