import courses from '../../global/courses'
export const searchCourse = (title) => {
    const results = []
    for (let i = 0; i < courses.length; i++){
        var low_title = courses[i].title.toLowerCase()
        var tmp = low_title.includes(title.toLowerCase())
        if(tmp === true){
            results.push(courses[i])
        }
    }
    if(results.length === 0)
    {
        return {course: results, status: 404}
    }
    return {course: results, status: 200}
}

export const searchCourseOfAuthor = (author) => {
    const results = []
    for (let i = 0; i < courses.length; i++){
        if(courses[i].author === author){
            results.push(courses[i])
        }
    }
    if(results.length === 0)
    {
        return {course: results, status: 404}
    }
    return {course: results, status: 200}
}