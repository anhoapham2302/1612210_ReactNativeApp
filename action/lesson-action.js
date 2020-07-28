import { apiGetLessonsOfCourse } from "../core/services/course-service";

export const getLesson = (dispatch) => (token, id) => {
  apiGetLessonsOfCourse(token, id)
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: "REQUEST_LIST_LESSON_SUCCESSED",
        data: res.payload.section,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
