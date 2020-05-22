import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text} from 'react-native'


const ImageButton = (props) => {
    return <ImageBackground style={styles.button} source={{uri: props.image}}>
        <TouchableOpacity style={styles.touch}>
            <Text style = {styles.text}>{props.title}</Text>
        </TouchableOpacity>
    </ImageBackground>
}

const styles = StyleSheet.create({
    button:{
        height:100,
        margin: 5

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