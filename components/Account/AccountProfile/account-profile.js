import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";

import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../../provider/auth-provider";
import { ThemeContext } from "../../../provider/theme-provider";
import { themes } from "../../../global/theme";
import SectionCourses from "../../Main/Home/SectionCourses/section-courses";
import {
  apiUpdateProfile,
  apiGetInfo,
} from "../../../core/services/account-service";
import Colors from "../../../global/color";
import { LanguageContext } from "../../../provider/language-provider";
import { languages } from "../../../global/language";

const firebaseConfig = {
  apiKey: "AIzaSyDO1f6iJGQ0V73vsQSUvFFARU3YKapq_4s",
  authDomain: "react-native-2020-31543.firebaseapp.com",
  databaseURL: "https://react-native-2020-31543.firebaseio.com",
  projectId: "react-native-2020-31543",
  storageBucket: "react-native-2020-31543.appspot.com",
  messagingSenderId: "302457066942",
  appId: "1:302457066942:web:b415e551de0a993af215ef",
  measurementId: "G-Q2PQF9WBX9",
};

const AccountProfile = (props) => {
  const {language, setLanguage} = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const [name, setName] = useState(state.userInfo.name);
  const [phone, setPhone] = useState(state.userInfo.phone);
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [firebaseUrl, setFirebaseUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadImg, setLoadImg] = useState(true);
  const [updating, setUpdating] = useState(true);
  const [message, setMessage] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  const uploadImage = async (uri) => {
    setLoading(true);
    const name = new Date().getTime();
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref("images").child(name.toString());
    return ref.put(blob).then(() => {
      ref
        .getDownloadURL()
        .then((url) => setFirebaseUrl(url))
        .finally(() => setLoading(false));
    });
  };
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        uploadImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    setLoadImg(true);
    apiGetInfo(state.token)
      .then((respone) => respone.json())
      .then((res) => {
        setData(res.payload);
        if (firebaseUrl === null) {
          setFirebaseUrl(res.payload.avatar);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadImg(false));
  }, [loading]);

  const updateName = () => {
    if (name === "") {
      Alert.alert(language.pleaseName);
    } else {
      if (phone === "") {
        Alert.alert(language.pleasePhone);
      } else {
        if (loading === false) {
          setUpdating(true);
          apiUpdateProfile(state.token, name, firebaseUrl, phone)
            .then((respone) => respone.json())
            .then((res) => setMessage(res.message))
            .catch((err) => console.log(err))
            .finally(() => setUpdating(false));
        }
      }
    }
  };

  useEffect(() => {
    if (updating === false) {
      if (message === "OK") {
        Alert.alert(language.success);
      } else {
        Alert.alert(message);
      }
    }
  }, [updating]);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <View style={[styles.header, {backgroundColor: Colors.changePassword}]}></View>
        {loadImg ? (
          <ActivityIndicator />
        ) : image !== null ? (
          <Image style={styles.avatar} source={{ uri: image }} />
        ) : (
          <Image style={styles.avatar} source={{ uri: data.avatar }} />
        )}
        <Button
          icon="upload"
          mode="text"
          uppercase={false}
          color={Colors.changePassword}
          style={{
            marginLeft: 230,
            marginTop: 30,
            width: 100,
          }}
          labelStyle={{
            fontSize: 15,
          }}
          onPress={(getPermissionAsync, _pickImage)}
        >
          {language.upload}
        </Button>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TextInput
              style={[
                styles.name,
                {
                  color: theme.foreground,
                  borderBottomWidth: 1,
                  fontWeight: "700",
                },
              ]}
              defaultValue={data.name}
              onChangeText={(name) => setName(name)}
            ></TextInput>
            <Text style={styles.info}>Email: {data.email}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.info}>{language.name}: </Text>
              <TextInput
                style={{
                  fontSize: 16,
                  color: "#00BFFF",
                  fontWeight: "700",
                  marginTop: 7,
                  borderBottomWidth: 1,
                  borderBottomColor: "#00BFFF",
                }}
                defaultValue={data.phone}
                onChangeText={(phone) => setPhone(phone)}
              ></TextInput>
            </View>
            <Text style={styles.info}>{language.type}: {data.type}</Text>
          </View>
              <View style={{ alignItems: "center"}}>
                 <Button
               icon="update"
               mode="outlined"
               loading={loading}
               color={Colors.changePassword}
               style={{
                 width: 120,
                 borderWidth: 1,
                  borderColor: Colors.changePassword
               }}
               onPress={updateName}
               >
              {language.update}
             </Button>
              </View>             
          <SectionCourses title={language.yourCourse} navigation={props.navigation} />
        </View>
      </View>
      <Button
        icon="key-change"
        mode="outlined"
        color={Colors.changePassword}
        style={{ width: 190, margin: 15, borderColor: "red", borderWidth: 1 }}
        onPress={() => {
          props.navigation.navigate("ChangePassword");
        }}
      >
        {language.changePassword}
      </Button>
      <Button
        icon="account-arrow-left-outline"
        mode="outlined"
        color={Colors.login}
        style={{ width: 190, margin: 15, marginTop: 0, borderColor: Colors.login, borderWidth: 1 }}
        onPress={() => {
          props.navigation.navigate("Login");
        }}
      >
        {language.logOut}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  body: {},
  bodyContent: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
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
