import { apiSearchCourses } from "../core/services/course-service";

export const getCoursesSearch = (dispatch) => (input_text) => {
  apiSearchCourses(input_text)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "CONFIRM_SEARCH", data: data.payload.rows, count: data.payload.count});
    })
    .catch((error) => console.error(error));
};
