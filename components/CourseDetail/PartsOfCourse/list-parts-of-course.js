import React from 'react'
import { StyleSheet, Text, View, SectionList} from 'react-native'
import Styles from '../../../global/style'
import ListPartsOfCourseItem from './list-parts-of-course-item'

const ListPartsOfCourse = (props) => {
    const parts = [
       {
           title:'Section 1',
           data:[
               {
                    id : 1,
                    name: 'Part 1',
                    duration: '30 mins'
                },
                {
                    id : 2,
                    name: 'Part 2',
                    duration: '30 mins'
                },
                {
                    id : 3,
                    name: 'Part 3',
                    duration: '30 mins'
                },
                {
                    id : 4,
                    name: 'Part 4',
                    duration: '30 mins'
                },
                ]
       },
       {
        title:'Section 2',
        data:[
            {
                 id : 5,
                 name: 'Part 1',
                 duration: '30 mins'
             },
             {
                 id : 6,
                 name: 'Part 2',
                 duration: '30 mins'
             },
             {
                 id : 7,
                 name: 'Part 3',
                 duration: '30 mins'
             },
             {
                 id : 8,
                 name: 'Part 4',
                 duration: '30 mins'
             },
             ]
    },
    ]

    const renderSeparator = () => {
        return (
          <View
            style={Styles.renderseparator}
          />
        );
      };
    
      return (
        <View style={Styles.view}> 
            <SectionList 
                sections ={parts}
                renderItem={({item})=><ListPartsOfCourseItem item = {item}/>}
                renderSectionHeader={({section:{title}})=> <Text style = {Styles.text}>{title}</Text>}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
export default ListPartsOfCourse
