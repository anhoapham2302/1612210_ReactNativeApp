import { apiSearchCourses } from "../core/services/search-service";

export const getCoursesSearch = (dispatch) => (token, input_text) => {
  apiSearchCourses(token, input_text)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "CONFIRM_SEARCH", data: data.payload.courses.data, count: data.payload.courses.total});
    })
    .catch((error) => console.error(error));
};
