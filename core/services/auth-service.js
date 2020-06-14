const accounts = [
    {
        username: 'admin0',
        password: '123',
        fullname: 'Admin 0',
        avatar: require('../../assets/1.jpg'),
        fav_courses:  [],
        bookmark_courses:[]
    },
    {
        username: 'admin1',
        password: '123456',
        fullname: 'Admin 1',
        avatar: require('../../assets/2.jpg'),
        fav_courses: [],
        bookmark_courses:[]
    }
]

export const login = (username, password)=>{
    for(let i = 0; i < accounts.length; i++){
        console.log(accounts[i].username)
        if(username.toLowerCase() === accounts[i].username){
            if(password === accounts[i].password){
                return {status: 200, user: {avatar: accounts[i].avatar, fullname: accounts[i].fullname, fav_courses: accounts[i].fav_courses, bookmark_courses: accounts[i].bookmark_courses}}
            }else{
                return {status: 404, errorString: 'Username and Password are not match'}
            }
        }
    }
    return {status: 404, errorString: 'Username is not existed!'}
}
