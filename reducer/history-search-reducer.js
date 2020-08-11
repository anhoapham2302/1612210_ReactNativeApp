export const historySearchReducer = (prevState, action) => {
    switch (action.type){
      case "SELECT_RESULT":
        return {...prevState, text: action.text, visible: false}
        case "COMPLETE_SEARCH":
        return {...prevState, visible: true}
      default:
        throw new Error();
    }
  }