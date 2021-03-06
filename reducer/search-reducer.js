export const searchReducer = (prevState, action) => {
    switch (action.type){
      case "SEARCH_REQUEST":
        return {...prevState, isLoading: true};
      case "CONFIRM_SEARCH":
        return {...prevState, courses: action.courses, coursesCount: action.coursesCount, isLoading: false, isFirst: false, coursesPage: action.coursesPage, instructors: action.instructors, instructorsCount: action.instructorsCount}
      default:
        throw new Error();
    }
  }