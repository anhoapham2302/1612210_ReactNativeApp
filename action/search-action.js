import { apiSearchCourses } from "../core/services/search-service";

export const getCoursesSearch = (dispatch) => (token, input_text, limit, offset, coursesPage) => {
  dispatch({type: "SEARCH_REQUEST"})
  apiSearchCourses(token, input_text, limit, offset)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "CONFIRM_SEARCH", courses: data.payload.courses.data, coursesCount: data.payload.courses.total, coursesPage: coursesPage, instructors: data.payload.instructors.data, instructorsCount:  data.payload.instructors.total
    });
    })
    .catch((error) => console.error(error));
};

export const getInstructorsSearch = (dispatch) => (token, input_text, limit, offset, instructorsPage) => {
  apiSearchCourses(token, input_text, limit, offset)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "CONFIRM_SEARCH", instructors: data.payload.instructors.data, instructorsCount:  data.payload.instructors.total, instructorsPage: instructorsPage
    });
    })
    .catch((error) => console.error(error));
};


export const historySearchAction = (dispatch) => (type, text) => {
  dispatch({type: type, text: text})
}