import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text} from 'react-native'


const ImageButton = (props) => {
    return <ImageBackground style={styles.button} source={{uri: 'https://i.pinimg.com/564x/aa/ff/80/aaff80b53e415268590d82d67ac5a1a5.jpg'}}>
        <TouchableOpacity style={styles.touch}>
            <Text style = {styles.text}>{props.title}</Text>
        </TouchableOpacity>
    </ImageBackground>
}

const styles = StyleSheet.create({
    button:{
        height:100,
        marginLeft: 5,
        marginRight:5
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