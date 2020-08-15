import { apiGetAllCat, apiGetCoursesFromCat, apiCourseDetails, apiGetRating } from "../core/services/course-service"

export const getCourseDetailsAction = (course_id, callback) => {
    apiCourseDetails(course_id)
      .then((response) => response.json())
      .then((res) => {
          console.log(res);
        callback(res);
      })
      .catch((error) => console.log(error))
}
export const getAllCatAction = (callback) => {
    apiGetAllCat()
    .then((respone) => respone.json())
    .then((res) => {
        callback(res)
    }) 
    .catch((err) => console.log(err));
}

// export const getCoursesFromCatAction = (cat_id, callback) => {
//     apiGetCoursesFromCat(cat_id)
//     .then((respone) => respone.json())
//     .then((res) => {
//         callback(res)
//     }) 
//     .catch((err) => console.log(err));
// }

export const getRatingAction = (token, course_id, callback) => {
    apiGetRating(token, course_id, null)
    .then((respone) => respone.json())
    .then((res) => {callback(res)
    })
    .catch((err) => console.log(err));
}