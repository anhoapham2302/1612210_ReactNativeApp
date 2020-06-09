export const login = (username, password)=>{
    if(username.toLowerCase() === 'admin'){
        if(password === '123456'){
            return {status: 200, user: {avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-12.jpg', fullname: 'An Hoa Pham 31/07/1998s'}}
        }else{
            return {status: 404, errorString: 'Username and Password are not match'}
        }
    }
    return {status: 404, errorString: 'Username is not existed!'}
}