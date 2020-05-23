import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TopAuthor from '../../Main/Browse/TopAuthor/top-author'

const AccountProfile = () => {
    return (
        <View>
        <View style={styles.item}>
            <Image source={{uri: 'https://lucloi.vn/wp-content/uploads/2020/03/90443889_1016737482055036_219143065531580416_n.jpg'}} style = {styles.image} />
            <View style={styles.text}>
            <Text style={styles.name}>Pham An Hoa</Text>
            </View>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.profile_text}>Type:</Text>
            <Text style={styles.profile_text1}>Premium</Text>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.profile_text}>Date active:</Text>
            <Text style={styles.profile_text1}>May 20, 2020</Text>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.profile_text}>Most view subject:</Text>
            <Text style={styles.profile_text1}>React Native</Text>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.profile_text}>Favorite authors:</Text>
            <TopAuthor/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginVertical:10,
        borderBottomWidth: 0.5,
    },
    image:{
        height: 80,
        width: 80,
        borderRadius: 40,
        marginTop:5
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    text:{
        paddingLeft: 10,
        paddingTop:30
    },
    profile_text:{
        fontSize:17,
        color: 'darkgrey'
    },
    profile_text1:{
        fontSize:20,
        marginLeft: 20
    }
})

export default AccountProfile

