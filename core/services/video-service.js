export const apiGetVideoData = (token, course_id, lesson_id) => {
    return fetch(`https://api.itedu.me/lesson/video/${course_id}/${lesson_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
}