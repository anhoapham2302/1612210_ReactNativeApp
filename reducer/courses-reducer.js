export const coursesReducer = (prevState, action) => {
    switch (action.type){
      case "REQUEST_RELOAD":
        return {reload: true}
      case "REQUEST_LIST_COURSES_SUCCESSED":
        return {...prevState, data: action.data, isLoading: false, reload: false}
      default:
        throw new Error();
    }
  }