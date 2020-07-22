import React, { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import PopularSkillsItem from '../PopularSkillsItem/popular-skills-item'
import Styles from '../../../../global/style'
import { ThemeContext } from '../../../../provider/theme-provider'

const PopularSkills = (props) => {
    const {theme} = useContext(ThemeContext)
    const skills = [
        {
            id : 1,
            name: 'Angular',
        },
        {
            id : 2,
            name: 'React Native',
        },
        {
            id : 3,
            name: 'C#',
        },
        {
            id : 4,
            name: 'Java',
        },
        {
            id : 5,
            name: 'JavaScript',
        },
        {
            id : 6,
            name: 'Node.js',
        },
        {
            id : 7,
            name: 'ASP.NET',
        },
        {
            id : 8,
            name: 'Design Patterns',
        },
        {
            id : 9,
            name: 'Python',
        },
        {
            id : 10,
            name: 'Machine Learning',
        },
      
    ]

    const renderListItems = (skills) => {
        return skills.map(item => <PopularSkillsItem item = {item}/>);
    }

    return <View style = {Styles.view}>
        <View>
            <Text style = {{fontWeight: 'bold', fontSize: 20, color: theme.foreground}}>{props.title}</Text>
        </View>
        <ScrollView horizontal={true}>
            {renderListItems(skills)}
        </ScrollView>
    </View>
}


export default PopularSkills
