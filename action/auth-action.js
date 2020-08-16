import {apiLogin, apiRegister, apiSendEmailForgotPassword, apiChangePassword, apiGoogleLogin} from '../core/services/auth-service'
export const login = (dispatch) => (username, password) => {
    dispatch({type: 'LOGIN_REQUEST'})
    apiLogin(username, password).then((response) => {
            if(response.status === 200){
                response.json().then(data => {
                    dispatch({type: 'LOGIN_SUCCESSED', data: data})
                })              
            }else{
                dispatch({type: 'LOGIN_FAILED'})
            }
        })
        .catch((error) => {
            dispatch({type: 'LOGIN_FAILED'})
        })
}

export const loginGoogle = (dispatch) => (email, id) => {
    dispatch({type: 'LOGIN_REQUEST'})
    apiGoogleLogin(email, id).then((response) => {
            if(response.status === 200){
                response.json().then(data => {
                    dispatch({type: 'LOGIN_SUCCESSED', data: data})
                })              
            }else{
                dispatch({type: 'LOGIN_FAILED'})
            }
        })
        .catch((error) => {
            dispatch({type: 'LOGIN_FAILED'})
        })
}

export const register = (name, email, phone, password, callBack) => {
    apiRegister(name, email, phone, password)
    .then((response => callBack(response.status)))
    .catch(err => console.log(err))
}

export const sendEmailForgotPassword = (email, callBack) => {
    apiSendEmailForgotPassword(email)
    .then((response) =>{
        callBack(response.status)
    })
    .catch(err => console.log(err))
}

export const changePassword = (token, id, opassword, npassword, callBack) => {
    apiChangePassword(token, id, opassword, npassword)
    .then((response) =>{
        callBack(response.status)
    })
    .catch(err => console.log(err))
}