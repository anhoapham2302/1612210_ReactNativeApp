export const searchReducer = (prevState, action) => {
    switch (action.type){
        case "CONFIRM_SEARCH":
        return {...prevState, courses: action.courses, coursesCount: action.coursesCount, isLoading: false, isFirst: false, coursesPage: action.coursesPage}
      default:
        throw new Error();
    }
  }