import courses from "../../global/courses"
import { useContext, useState, useEffect} from "react"
import { BookmarkContext } from "../../provider/bookmark-provider"

export const renderCourses = (course_id) => {
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
                limit: 10,
                offset: 0
        })
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

export const renderNewRelease = () => {
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
