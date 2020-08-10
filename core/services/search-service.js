export const apiSearchCourses = (token, text) => {
  return fetch("https://api.itedu.me/course/searchV2", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      keyword: text,
      limit: 0,
      offset: 0,
    }),
  });
};

export const apiGetHistorySearch = (token) => {
    return fetch("https://api.itedu.me/course/search-history", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
    })
}
