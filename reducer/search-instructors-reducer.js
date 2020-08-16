export const searchInstructorsReducer = (prevState, action) => {
    switch (action.type){
        case "CONFIRM_SEARCH":
        return {...prevState, instructors: action.instructors, instructorsCount: action.instructorsCount, instructorsPage: action.instructorsPage}
      default:
        throw new Error();
    }
  }