import { apiSearchCourses } from "../core/services/search-service";

export const getCoursesSearch = (dispatch) => (token, input_text, limit, offset, page) => {
  apiSearchCourses(token, input_text, limit, offset)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "CONFIRM_SEARCH", data: data.payload.courses.data, count: data.payload.courses.total, page: page});
    })
    .catch((error) => console.error(error));
};

export const historySearchAction = (dispatch) => (type, text) => {
  dispatch({type: type, text: text})
}