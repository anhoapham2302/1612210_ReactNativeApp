import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Google from "expo-google-app-auth";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { LanguageContext } from "../../../provider/language-provider";
import Styles from "../../../global/style";
import Colors from "../../../global/color";
import { AuthContext } from "../../../provider/auth-provider";
import { CoursesContext } from "../../../provider/course-provider";

const Login = (props) => {
  const { language } = useContext(LanguageContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const coursesContext = useContext(CoursesContext);
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    setLoading(false);
    if (authContext.state.isAuthenticating === false) {
      if (authContext.state.isAuthenticated) {
        if (authContext.state.userInfo !== null) {
          props.navigation.navigate("Main");
          coursesContext.renderFavoriteCourses(state.token);
        } else {
          setLoading(true);
          setTimeout(() => {
            authContext.loginGoogle(email, id);
          }, 3000);
        }
      } else {
        Alert.alert(language.loginErr);
      }
    }
  }, [authContext.state.isAuthenticating]);

  const onPressLogin = () => {
    if (username === "") {
      Alert.alert(language.pleaseEmail);
    } else {
      if (password === "") {
        Alert.alert(language.pleasePass);
      } else {
        setLoading(true);
        authContext.login(username, password);
      }
    }
  };

  const signInWithGoogleAsync = () => {
    try {
      const result = Google.logInAsync({
        iosClientId: `1066996670312-cb0e4det3crugln5i3gksvnj7b1k0lnf.apps.googleusercontent.com`,
        androidClientId: `1066996670312-lrk75b7kn3kut9rlbn1kid4r8mghb4f4.apps.googleusercontent.com`,
        webClientId: `1066996670312-lrk75b7kn3kut9rlbn1kid4r8mghb4f4.apps.googleusercontent.com`,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setEmail(result.user.email);
        setId(result.user.id);
        setLoading(true);
        authContext.loginGoogle(result.user.email, result.user.id);
      } else {
        console.log("");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onPressRegister = () => {
    props.navigation.navigate("Register");
  };
  const onPressForgotPassword = () => {
    props.navigation.navigate("ForgotPassword");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={loading} />
      <Text style={[Styles.title, { color: Colors.login }]}>
        {language.login}
      </Text>
      <Button
        icon={{
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/471px-Google_%22G%22_Logo.svg.png",
        }}
        mode="outlined"
        style={[
          Styles.button,
          {
            backgroundColor: "#fff",
            borderColor: Colors.loginGoogle,
            marginBottom: 5,
          },
        ]}
        labelStyle={{ color: Colors.loginGoogle, fontSize: 17 }}
        onPress={signInWithGoogleAsync}
        uppercase={false}
      >
        {language.google}
      </Button>
      <Text style={{ fontSize: 17, marginVertical: 5, color: "darkgrey" }}>
        {language.or}
      </Text>
      <TextInput
        style={[Styles.text_input, { borderColor: Colors.login }]}
        onChangeText={(text) => setUsername(text)}
        placeholder="Email"
        defaultValue={username}
      />
      <TextInput
        style={[Styles.text_input, { borderColor: Colors.login }]}
        onChangeText={(text) => setPassword(text)}
        placeholder={language.password}
        secureTextEntry
      />
      <TouchableOpacity style={Styles.button} onPress={onPressLogin}>
      <Text style={Styles.button_text}>{language.login}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 0 }}
        onPress={onPressForgotPassword}
      >
        <Text
          style={{ color: Colors.forgotPassword, fontSize: 15, marginTop: 5 }}
        >
          {language.forgotPassword}?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Styles.button_reg, { marginTop: 25 }]}
        onPress={onPressRegister}
      >
        <Text style={Styles.button_text}>{language.register}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
