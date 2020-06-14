import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native'
import ListCourses from '../../Courses/ListCourses/list-courses'
import { ThemeContext } from '../../../provider/theme-provider'

const AuthorProfile = (props) => {
  const {theme} = useContext(ThemeContext)
    return (
        <ScrollView style = {{backgroundColor: theme.background}}>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={props.route.params.item.avatar}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{props.route.params.item.name}</Text>
              <Text style={styles.info}>{props.route.params.item.field}</Text>
              <Text style={styles.description}>Mô tả: ...</Text>
            </View>
        </View>
        </View>
        <ListCourses navigation={props.navigation} com = 'Author' author = {props.route.params.item.name} title='Courses'/>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:200,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
})

export default AuthorProfile
