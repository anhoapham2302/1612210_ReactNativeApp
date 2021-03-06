export const loginReducer = (prevState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {...prevState, isAuthenticating: true, isAuthenticated: false}
        case "LOGIN_SUCCESSED":
            return {...prevState, isAuthenticated: true, isAuthenticating: false, token: action.data.token, userInfo: action.data.userInfo}
        case "LOGIN_FAILED":
            return {...prevState, isAuthenticated: false, isAuthenticating: false}
        default:
            throw new Error();
    }
}
