export const apiGetAllCat = () => {
    return fetch('https://api.itedu.me/category/all', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export const apiGetCoursesFromCat = (cat_id) => {
    return fetch('https://api.itedu.me/course/search', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                keyword: "",
                opt: {
                  category:   
                      cat_id
                  
                }, 
                limit: 0,
                offset: 0
        })
        })
}

export const apiCourses = (course_id) => {
     return fetch('https://api.itedu.me/course/search', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                keyword: "",
                opt: {
                  category: [   
                      course_id
                  ]
                }, 
                limit: 0,
                offset: 0
        })
        })
}

export const apiCourseDetails = (id) => {
    return fetch('https://api.itedu.me/course/get-course-info?id=' + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        })
}

export const renderTopSell = () => {
    return fetch('https://api.itedu.me/course/top-sell', {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
            limit: 10,
            page: 1
       })
       })
}

export const apiTopRated = () => {
    return fetch('https://api.itedu.me/course/top-rate', {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
            limit: 10,
            page: 1
       })
       })
}

export const apiNewRelease = () => {
    return fetch('https://api.itedu.me/course/top-new', {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
            limit: 10,
            page: 1
       })
       })
}

export const apiGetLessonsOfCourse = (token, id) => {
    return fetch(`https://api.itedu.me/course/detail-with-lesson/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
}

export const apiUpdateCurrentTime = (token, id, time) => {
    return fetch('https://api.itedu.me/lesson/update-current-time-learn-video', {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            lessonId: id,
            currentTime: time
        })
      });
}

export const apiGetLastWatchedLesson = (token, id) => {
    return fetch(`https://api.itedu.me/course/last-watched-lesson/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
}

export const apiGetLessonDetail = (token, course_id, lesson_id) => {
    return fetch(`https://api.itedu.me/lesson/detail/${course_id}/${lesson_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
}

export const apiGetExcercise = (token, lesson_id) => {
    return fetch(`https://api.itedu.me/exercise/student/list-exercise-lesson`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            lessonId: lesson_id
        })
      });
}

export const apiGetRating = (token, course_id, id) => {
    return fetch(`https://api.itedu.me/course/get-course-detail/${course_id}/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
}

export const apiSendRate = (token, course_id, formalityPoint, contentPoint, presentationPoint, content) => {
    return fetch('https://api.itedu.me/course/rating-course', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            courseId: course_id,
            formalityPoint: formalityPoint,
            contentPoint: contentPoint,
            presentationPoint: presentationPoint,
            content: content
        })
      });
}