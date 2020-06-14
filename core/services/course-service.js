import courses from "../../global/courses"
import { useContext } from "react"
import { BookmarkContext } from "../../provider/bookmark-provider"

export const renderCourses = (title) => {
    const {bookmark} = useContext(BookmarkContext)
    const null_array = []
    const mobile_course = []
    const web_course = []
    const game_course = []
    const db_course = []
    const top_course = []

    courses.sort(function(a, b){
        return b.view - a.view
    })

    for(let i = 0; i < courses.length; i++){
        if(courses[i].cat === 'Mobile'){
            mobile_course.push(courses[i])
        }else{
            if(courses[i].cat === 'Web'){
                web_course.push(courses[i])
            }else{
                if(courses[i].cat === 'Game'){
                    game_course.push(courses[i])
                }else{
                    if(courses[i].cat === 'Database'){
                        db_course.push(courses[i])
                    }
                }
            }
        }
    }
    
    for (let i =0; i < 5; i++){
        top_course.push(courses[i])
    }
    if(title === 'Mobile Development'){
        return {array: mobile_course}
    }

    if(title === 'Web Development'){
        return {array: web_course}
    }

    if(title === 'Game Development'){
        return {array: game_course}
    }

    if(title === 'Databases Development'){
        return {array: db_course}
    }

    if(title === 'Top Courses'){
        return {array: top_course}
    }
    if(title === 'Bookmarks'){
        return {array: bookmark}
    }
    return {array: null_array}
}
