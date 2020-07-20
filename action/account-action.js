import { apiGetFavoriteCourses } from "../core/services/account-service"

export const renderFavoriteCourses = (dispatch) => (token) => {
    apiGetFavoriteCourses(token)
    .then((response) => response.json())
    .then((data) => {
        dispatch({type: "REQUEST_LIST_COURSES_SUCCESSED", data: data.payload})
    }
   )
    .catch((error) => console.error(error))
}