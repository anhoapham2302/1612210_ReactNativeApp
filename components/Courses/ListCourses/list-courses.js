import React from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Button, SectionList } from 'react-native'
import ListCoursesItem from '../ListCoursesItem/list-courses-item'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ListCourses = (props) => {
    const courses = [
        {
            title: 'Mobile',
            data:  [
            {
                id : 1,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/1.jpg'),
                rating: 4
            },
            {
                id : 2,
                title: 'UI/UX Design',
                author: 'Author 2',
                level: 'Advance',
                release: 'May 6, 2020',
                duration: '50 hours',
                image: require('../../../assets/2.jpg'),
                rating: 4
            },
            {
                id : 3,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/3.jpg'),
                rating: 4
            },
            {
                id : 4,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/4.jpg'),
                rating: 4
            },
                ]   
        },
        {
            title: 'Web',
            data:  [
            {
                id : 5,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/1.jpg'),
                rating: 4
            },
            {
                id : 6,
                title: 'UI/UX Design',
                author: 'Author 2',
                level: 'Advance',
                release: 'May 6, 2020',
                duration: '50 hours',
                image: require('../../../assets/2.jpg'),
                rating: 4
            },
            {
                id : 7,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/3.jpg'),
                rating: 4
            },
            {
                id : 8,
                title: 'React Native',
                author: 'Author 1',
                level: 'Beginer',
                release: 'May 6, 2020',
                duration: '40 hours',
                image: require('../../../assets/4.jpg'),
                rating: 4
            },
                ]         
        } 
    ]

    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
        
            }}
          />
        );
      };

      const searchView=()=>{
          return <View style = {{flexDirection:"row", margin:5}}>
              <TextInput style = {styles.search} placeholder = 'Search input...'/>           
              <TouchableOpacity style={styles.button}>
              <Text style={{color:'white', fontWeight:"bold", fontSize:15, paddingTop:5, textAlign:"center"}}>Search</Text>
              </TouchableOpacity>
          </View>
      }

    return (
        <View> 
            <SectionList 
                sections={courses}
                renderItem={({item})=><ListCoursesItem item = {item}/>}
                renderSectionHeader={({section: {title}}) => <View style={{backgroundColor: "white", marginTop:10}}><Text style={{fontSize: 20, fontWeight: "bold", color: 'royalblue'}}>{title}</Text></View>}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent = {searchView}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search:{
        flex: 1, 
        borderWidth: 0.5, 
        fontSize:20,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5
    },
    button:{
        borderWidth: 0.5, 
        width: 70,
        height: 35,
        backgroundColor: 'royalblue',
        borderTopRightRadius:5,
        borderBottomRightRadius:5
    }
})

export default ListCourses;
