export const lessonReducer = (prevState, action) => {
    switch (action.type){
      case "REQUEST_LIST_LESSON_SUCCESSED":
        return {...prevState, data: action.data, isLoading: false}
      default:
        throw new Error();
    }
  }