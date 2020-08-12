export const searchReducer = (prevState, action) => {
    switch (action.type){
        case "CONFIRM_SEARCH":
        return {...prevState, data: action.data, count: action.count, isLoading: false, isFirst: false, page: action.page}
      default:
        throw new Error();
    }
  }