import courses from "../../global/courses"
import authors from "../../global/authors"

export const pushCoursesOfAuthor = () => {
    for (let i = 0; i < authors.length; i++){
        for (let j = 0; j < courses.length; j++){
            if(courses[j].author === authors[i].name){
                authors[i].courses_author.push(courses[j])
            }
        }
    }
}