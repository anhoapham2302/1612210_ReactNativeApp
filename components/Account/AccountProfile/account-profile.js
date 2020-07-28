import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../../provider/auth-provider";
import ListCourses from "../../Courses/ListCourses/list-courses";
import { FavContext } from "../../../provider/favorite-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import { themes } from "../../../global/theme";
import { CoursesContext } from "../../../provider/course-provider";

const AccountProfile = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);

  const onPressSignOut = () => {
    props.navigation.navigate("Login");
  };
  const onPressChangePassword = () => {
    props.navigation.navigate("ChangePassword");
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{ uri: state.userInfo.avatar }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={[styles.name, { color: theme.foreground }]}>
              {state.userInfo.name}
            </Text>
            <Text style={styles.info}>
              Email: {state.userInfo.email}
            </Text>
            <Text style={styles.info}>
              Số điện thoại: {state.userInfo.phone}
            </Text>
            <Text style={styles.info}>
              Loại tài khoản: {state.userInfo.type}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{ width: 120, margin: 10 }}
        onPress={onPressSignOut}
      >
        <Icon.Button name="sign-out" style={{ backgroundColor: "red" }}>
          <Text style={{ fontSize: 17, color: "white" }}>Sign Out</Text>
        </Icon.Button>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: 190, margin: 10 }}
        onPress={() => {
          if (theme === themes.light) setTheme(themes.dark);
          else setTheme(themes.light);
        }}
      >
        <Icon.Button name="reply" style={{ backgroundColor: "blue" }}>
          <Text style={{ fontSize: 17, color: "white" }}>Change Theme</Text>
        </Icon.Button>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
    borderBottomWidth: 0.5,
  },
  text: {
    paddingLeft: 10,
    paddingTop: 30,
  },
  profile_text: {
    fontSize: 17,
    color: "darkgrey",
  },
  profile_text1: {
    fontSize: 20,
    marginLeft: 20,
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

export default AccountProfile;
