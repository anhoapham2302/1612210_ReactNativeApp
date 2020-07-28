import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import ListCourses from '../ListCourses/list-courses'
import { apiNewRelease } from '../../../core/services/course-service';
import { apiRecommendCourses } from '../../../core/services/account-service';
import { AuthContext } from '../../../provider/auth-provider';

export default function ListCoursesPage(props) {
    const [data, setData] = useState([])
    const {state} = useContext(AuthContext)
    if (props.route.params.com === "NewRelease") {
        useEffect(() => {
          apiNewRelease()
          .then((respone)=>respone.json())
          .then((json)=>setData(json.payload))
          .catch((error) => console.error(error))
          .finally(()=> setLoading(false));
        }, []);
      }
      if (props.route.params.com === "Recommend") {
        useEffect(() => {
          apiRecommendCourses(state.userInfo.id, 10, 1)
          .then((respone)=>respone.json())
          .then((json)=>setData(json.payload))
          .catch((error) => console.error(error))
          .finally(()=> setLoading(false));
        }, []);
      }
    return (
       <ScrollView>
           <ListCourses title = {props.route.params.title} item = {data} com = {props.route.params.com} navigation={props.navigation}/>
       </ScrollView>
    )
}

const styles = StyleSheet.create({})
