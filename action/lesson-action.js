import { apiGetLessonsOfCourse, apiGetLessonDetail, apiGetExcercise } from "../core/services/course-service";

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

export const getDetailLessonAction = (token, course_id, lesson_id, callback) => {
  apiGetLessonDetail(token, course_id, lesson_id)
  .then((respone) => respone.json())
  .then((res) => callback(res))
  .catch((err) => console.log(err))
}

export const getExerciseAction = (token, lesson_id, callback) => {
  apiGetExcercise(token, lesson_id)
  .then((respone) => respone.json())
  .then((res) => {
    console.log(res);
    callback(res);
  })
  .catch((err) => console.log(err))
} 