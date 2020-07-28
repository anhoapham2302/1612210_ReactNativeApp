import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "../../../global/style";
import { apiRegister } from "../../../core/services/auth-service";
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
                    console.log(email);
                    apiRegister(name, email, phone, password)
                    .then((respone) => respone.json())
                    .then((res) => Alert.alert(res.message))
                    .catch((err) => console.log(err))
                    // props.navigation.navigate("Main");
                }
            }
          }
        }
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={Styles.text_input}
        onChangeText={(name) => setName(name)}
        placeholder="Name"
      />
      <TextInput
        style={Styles.text_input}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
      />
      <TextInput
        style={Styles.text_input}
        onChangeText={(phone) => setPhone(phone)}
        keyboardType="number-pad"
        placeholder="Phone number"
      />
      <TextInput
        style={Styles.text_input}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry       
        placeholder="Password"
      />
      <TextInput
        style={Styles.text_input}
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
