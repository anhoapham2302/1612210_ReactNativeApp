import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
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
  apiUpdateName,
  apiGetInfo,
} from "../../../core/services/account-service";
import { useIsFocused } from "@react-navigation/native";

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
  const { theme, setTheme } = useContext(ThemeContext);
  const { state } = useContext(AuthContext);
  const [name, setName] = useState(state.userInfo.name);
  const [phone, setPhone] = useState(state.userInfo.phone);
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [firebaseUrl, setFirebaseUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadImg, setLoadImg] = useState(true);

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
    setLoadImg(true)
    apiGetInfo(state.token)
      .then((respone) => respone.json())
      .then((res) => setData(res.payload))
      .catch((err) => console.log(err))
      .finally(() => setLoadImg(false));
  }, [loading]);

  const updateName = () => {
    if (name === "") {
      Alert.alert("Name is empty.");
    } else {
      if (loading === false) {
        console.log(firebaseUrl);
        apiUpdateName(state.token, name, firebaseUrl, phone)
          .then((respone) => respone.json())
          .then((res) => Alert.alert(res.message))
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <View style={styles.header}></View>
        {loadImg ? (
          <ActivityIndicator />
        ) : (
          image !== null ? <Image style={styles.avatar} source={{ uri: image }} /> :
          <Image style={styles.avatar} source={{ uri: data.avatar }} />
        )}
        <TouchableOpacity
          onPress={(getPermissionAsync, _pickImage)}
          style={{
            alignItems: "flex-end",
            borderColor: theme.background,
            height: 35,
            marginRight: 70,
          }}
        >
          <Icon.Button name="edit" backgroundColor="#fff" color="red">
            <Text style={{ fontSize: 17, color: "red" }}>Tải ảnh</Text>
          </Icon.Button>
        </TouchableOpacity>
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
              <Text style={styles.info}>Số điện thoại: </Text>
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
            <Text style={styles.info}>Loại tài khoản: {data.type}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={updateName}
              style={{
                alignItems: "flex-end",
                borderColor: theme.background,
                height: 35,
                marginRight: 70,
              }}
            >
              <Icon.Button name="edit" backgroundColor="#fff" color="red">
                <Text style={{ fontSize: 17, color: "red" }}>Cập nhật</Text>
              </Icon.Button>
            </TouchableOpacity>
          </View>
          <SectionCourses title="Your Courses" navigation={props.navigation} />
        </View>
      </View>
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
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    paddingBottom: 0,
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
