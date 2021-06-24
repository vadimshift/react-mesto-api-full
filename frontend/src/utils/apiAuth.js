export const BASE_URL = "https://api.vadim-21.nomoredomains.club";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    headers,
    method: "POST",
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorization = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    headers,
    method: "POST",
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
};
