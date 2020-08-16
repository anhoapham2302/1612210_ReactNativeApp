export const apiSearchCourses = (token, text, limit, offset) => {
  return fetch("https://api.itedu.me/course/searchV2", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      keyword: text,
      limit: limit,
      offset: offset,
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

export const apiDelHistorySearch = (token, id) => {
  return fetch(`https://api.itedu.me/course/delete-search-history/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
})
}
