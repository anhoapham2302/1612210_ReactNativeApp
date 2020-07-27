export const apiGetFavoriteCourses = (token) => {
  return fetch("https://api.itedu.me/user/get-favorite-courses", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const apiAddFavoriteCourse = (token, course_id) => {
  return fetch("https://api.itedu.me/user/like-course", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      courseId: course_id,
    }),
  });
};

export const apiRecommendCourses = (id, limit, offset) => {
  return fetch(
    `https://api.itedu.me/user/recommend-course/${id}/${limit}/${offset}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export const apiCheckOwnCourse = (token, id) => {
  return fetch(`https://api.itedu.me/user/check-own-course/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const apiChecLikeCourse = (token, id) => {
  return fetch(`https://api.itedu.me/user/get-course-like-status/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
