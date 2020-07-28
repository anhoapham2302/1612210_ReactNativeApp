export const apiGetListAuthor = () => {
  return fetch("https://api.itedu.me/instructor", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const apiAuthorDetail = (id) => {
    return fetch(`https://api.itedu.me/instructor/detail/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  