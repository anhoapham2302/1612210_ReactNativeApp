import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "../../../global/style";
import Colors from "../../../global/color";
import { AuthContext } from "../../../provider/auth-provider";
import { CoursesContext } from "../../../provider/course-provider";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const coursesContext = useContext(CoursesContext);
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (authContext.state.isAuthenticating === false) {
      if (authContext.state.isAuthenticated) {
        props.navigation.navigate("Main");
        coursesContext.renderFavoriteCourses(state.token);
      } else {
        Alert.alert("Email hoặc password không đúng.");
      }
    }
  }, [authContext.state.isAuthenticating]);

  const onPressLogin = () => {
    setLoading(true);
    authContext.login(username, password);
  };

  const onPressRegister = () => {
    props.navigation.navigate("Register");
  };
  const onPressForgotPassword = () => {
    props.navigation.navigate("ForgotPassword");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={loading} />
      <Text style={[Styles.title, { color: Colors.login }]}>Login</Text>
      <TextInput
        style={[Styles.text_input, { borderColor: Colors.login }]}
        onChangeText={(text) => setUsername(text)}
        placeholder="Email"
        defaultValue={username}
      />
      <TextInput
        style={[Styles.text_input, { borderColor: Colors.login }]}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
        defaultValue={password}
      />
      <TouchableOpacity style={Styles.button} onPress={onPressLogin}>
        <Text style={Styles.button_text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 0 }}
        onPress={onPressForgotPassword}
      >
        <Text
          style={{ color: Colors.forgotPassword, fontSize: 15, marginTop: 5 }}
        >
          Forgot password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Styles.button_reg, { marginTop: 25 }]}
        onPress={onPressRegister}
      >
        <Text style={Styles.button_text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
