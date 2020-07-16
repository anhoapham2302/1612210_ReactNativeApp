import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text} from 'react-native'


const ImageButton = (props) => {
    const onPressImageButton =()=>{   
        props.navigation.navigate("ListCoursesPage", {title: props.title, com: props.com})
    }
    return <ImageBackground style={styles.button} source={{uri: props.image}}>
        <TouchableOpacity style={styles.touch} onPress = {onPressImageButton}>
            <Text style = {styles.text}>{props.title}</Text>
        </TouchableOpacity>
    </ImageBackground>
}

const styles = StyleSheet.create({
    button:{
        height:100,
        marginBottom:10,
        marginHorizontal:17

    },
    touch:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default ImageButton;