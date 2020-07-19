export const apiLogin = (username, password)=>{
    return fetch('https://api.itedu.me/user/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
}
