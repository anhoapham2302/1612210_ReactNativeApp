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

export const apiAddFavoriteCourse = (token, course_id)=>{
    return fetch('https://api.itedu.me/user/like-course', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                courseId: course_id
            })
    })
}