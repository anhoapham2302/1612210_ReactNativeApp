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

export const apiRegister = (name, email, phone, password) => {
    return fetch('https://api.itedu.me/user/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: name,
            email: email,
            phone: phone,
            password: password
        })
    })
}