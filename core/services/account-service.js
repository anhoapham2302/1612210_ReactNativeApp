export const apiGetFavoriteCourses = (token)=>{
    return fetch('https://api.itedu.me/user/get-favorite-courses', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
    })
}
