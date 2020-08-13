export const searchReducer = (prevState, action) => {
    switch (action.type){
        case "CONFIRM_SEARCH":
        return {...prevState, courses: action.courses, instructors: action.instructors, coursesCount: action.coursesCount, instructorsCount: action.instructorsCount, isLoading: false, isFirst: false, coursesPage: action.coursesPage, instructorsPage: action.instructorsPage}
      default:
        throw new Error();
    }
  }