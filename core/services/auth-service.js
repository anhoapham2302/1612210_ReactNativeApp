export const login = (username, password)=>{
    const accounts = [
        {
            username: 'admin0',
            password: '123',
            fullname: 'Admin 0',
            avatar: require('../../assets/1.jpg')
        },
        {
            username: 'admin1',
            password: '123456',
            fullname: 'Admin 1',
            avatar: require('../../assets/2.jpg')
        }
    ]

    for(let i = 0; i < accounts.length; i++){
        UpdateAccount()
        console.log(accounts[i].username)
        if(username.toLowerCase() === accounts[i].username){
            if(password === accounts[i].password){
                return {status: 200, user: {avatar: accounts[i].avatar, fullname: accounts[i].fullname}}
            }else{
                return {status: 404, errorString: 'Username and Password are not match'}
            }
        }
    }
    return {status: 404, errorString: 'Username is not existed!'}
}