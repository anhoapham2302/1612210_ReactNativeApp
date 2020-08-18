import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Star from 'react-native-star-view';
import { ThemeContext } from '../../../provider/theme-provider';
import { apiAuthorDetail } from '../../../core/services/author-service';
import { apiGetLastWatchedLesson, apiCourseDetails } from '../../../core/services/course-service';
import { AuthContext } from '../../../provider/auth-provider';
import { ScrollView } from 'react-native-gesture-handler';
import { LanguageContext } from '../../../provider/language-provider';

const ListCoursesItem = (props) => {
    const {language} = useContext(LanguageContext);
    const {theme} = useContext(ThemeContext);
    const [author, setAuthor] = useState();
    const [loading, setLoading] = useState(true);
    const {state} = useContext(AuthContext);
    const [getLessonProcess, setGetLessonProcess] = useState(true);
    const [data, setData] = useState(null);
    const [course, setCourse] = useState([]);
    const [starCourse, setStarCourse] = useState(0);
    const [loadingStar, setLoadingStar] = useState(true);
    var star = 0;
    useEffect(() => {
        if(props.item.process !== undefined){
            apiCourseDetails(props.item.id)
            .then((respone) => respone.json())
            .then((res) => {setCourse(res.payload)}
            )
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
        }
    }, [])

    useEffect(() => {
        if(props.item.process !== undefined && loading === false){
            setLoadingStar(true);
            const star_course =   Math.round(( (course.contentPoint +
                course.formalityPoint +
                course.presentationPoint) /
              3)) 
              if(star_course < 6 && star_course > 0){
                setStarCourse(star_course);
            }else{
                if(star_course > 5){
                    setStarCourse(5);
                }else{
                    setStarCourse(0);
                }
        }
        setLoadingStar(false);
    }
    }, [loading])

    useEffect(() => {
        if(props.item.name === undefined & props.item['instructor.user.name'] === undefined){
            apiAuthorDetail(props.item.instructorId)
            .then(respone => respone.json())
            .then(res => setAuthor(res.payload))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
        }else{
            setLoading(false)
        }
    }, [])
    const onPressListItem =()=>{
        setGetLessonProcess(true)
        apiGetLastWatchedLesson(state.token, props.item.id)
        .then((respone) => {
            if(respone.status === 200){
                respone.json().then((res) => {
                    setData(res.payload)
                })
                .finally(() => setGetLessonProcess(false))
            }else{
                setGetLessonProcess(false);
            }
        })
    }

    useEffect(() => {
        if(getLessonProcess === false){
            if(data !== null){
                props.navigation.push("VideoMain", {item: data, course_id: props.item.id});
            }else{
                props.navigation.push("CourseDetail", {item: props.item})
            }
        }
    }, [getLessonProcess])

    const checkPrice = (price) => {
        if(price === 0){
        return <Text style = {{fontSize: 17, color: 'red', fontWeight: 'bold'}}>{language.free}</Text>
        }else{
            return <Text style = {{fontSize: 17, color: 'red', fontWeight: 'bold'}}>{price} VNĐ</Text>
        }
    }
    const checkName = () => {
        if(props.item.name){
            return  <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{`${props.item.name}`}</Text>
        }else{
            if(props.item['instructor.user.name']){
                return <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{`${props.item['instructor.user.name']}`}</Text>
            }else{
            return <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{author.name}</Text>
            }
        }
    }
    const checkType = () => {
        if(props.item.courseTitle)
        {   
            if(props.item.courseAveragePoint < 6 && props.item.courseAveragePoint > 0){
                star= props.item.courseAveragePoint;
            }else{
                if(props.item.courseAveragePoint > 5){
                    star = 5;
                }else{
                    star = 0
                }
            }
            return (<TouchableOpacity style = {styles.item}  onPress={onPressListItem}>
                <Image source={{uri: props.item.courseImage}} style = {styles.image} />
                <View style={styles.view}>
                <Text numberOfLines = {1} style = {{fontSize: 17, fontWeight: 'bold', marginBottom: 1, color: theme.foreground}}>{props.item.courseTitle}</Text>
                <Text style = {{fontSize:14, color: 'darkgrey', marginBottom: 1}}>{`${props.item.instructorName}`}</Text>
                <Star score={star} style={styles.starStyle}/>    
            <Text style = {{fontSize: 17, fontWeight: 'bold', color: '#62DDBD', marginBottom: 1}}>{props.item.courseSoldNumber} {language.student}</Text>
                {checkPrice(props.item.coursePrice)}
                </View>
            </TouchableOpacity>)
        }
        else
        {
            if(Math.ceil((props.item.contentPoint + props.item.formalityPoint + props.item.presentationPoint)/3) < 6 && Math.ceil((props.item.contentPoint + props.item.formalityPoint + props.item.presentationPoint)/3)>0){
                star= Math.ceil((props.item.contentPoint + props.item.formalityPoint + props.item.presentationPoint)/3);
            }else{
                star = 5;
            }
            return (   
                <TouchableOpacity style = {styles.item}  onPress={onPressListItem}>
                    <Image source={{uri: props.item.imageUrl}} style = {styles.image} />
                    <View style={styles.view}>
                    <Text numberOfLines = {1} style = {{fontSize: 17, fontWeight: 'bold', marginBottom: 1, color: theme.foreground}}>{props.item.title}</Text>
                    {checkName()}
                    <Star score={star} style={styles.starStyle}/>
                    <Text style = {{fontSize: 17, fontWeight: 'bold', color: '#62DDBD', marginBottom: 1}}>{props.item.soldNumber} {language.student}</Text>
                    {checkPrice(props.item.price)}
                    </View>
                </TouchableOpacity>)
        }
    }
return (
    <ScrollView>
        {loading ? <ActivityIndicator/> : 
        props.item.process !== undefined  ?  loadingStar ? <ActivityIndicator/> : (<View>
            <TouchableOpacity style = {styles.item}  onPress={onPressListItem}>
                    <Image source={{uri: course.imageUrl}} style = {styles.image} />
                    <View style={styles.view}>
                    <Text numberOfLines = {1} style = {{fontSize: 17, fontWeight: 'bold', marginBottom: 1, color: theme.foreground}}>{course.title}</Text>
                    <Text
           style={{ fontSize: 14, color: "darkgrey" }}
         >{props.item.instructorName}</Text>
           <Star
             score={
            starCourse
             }
             style={styles.starStyle}
           />
                    <Text style = {{fontSize: 17, fontWeight: 'bold', color: '#62DDBD', marginBottom: 1}}>{course.soldNumber} {language.student}</Text>
                    {checkPrice(course.price)}
                    </View>
                </TouchableOpacity>
        </View>) :  checkType()
       }
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    view:{
        marginLeft:5
    },
    item: {
        flexDirection: 'row',
    },
    
    image:{
        height: 105, 
        width: 140,
        marginTop:5
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    starStyle:{
        width: 110,
        height: 20,
        marginBottom: 2
    }
})

export default ListCoursesItem

