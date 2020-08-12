export const apiLogin = (username, password) => {
  return fetch("https://api.itedu.me/user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  });
};

export const apiRegister = (name, email, phone, password) => {
  return fetch("https://api.itedu.me/user/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: name,
      email: email,
      phone: phone,
      password: password,
    }),
  });
};

export const apiSendEmailForgotPassword = (email) => {
  return fetch("https://api.itedu.me/user/forget-pass/send-email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const apiChangePassword = (token, id, opassword, npassword) => {
  return fetch("https://api.itedu.me/user/change-password", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      id: id,
      oldPass: opassword,
      newPass: npassword,
    }),
  });
};

export const apiGoogleLogin = (email, id) => {
  return fetch("https://api.itedu.me/user/login-google-mobile", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
        id: id,
      },
    }),
  });
};
