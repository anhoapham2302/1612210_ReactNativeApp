import {apiLogin} from '../core/services/auth-service'
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