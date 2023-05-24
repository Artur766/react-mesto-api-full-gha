export const BASE_URL = " https://auth.nomoreparties.co";

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then(res => handleResponse(res))
    .then(res => res)
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then(res => handleResponse(res))
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        return res;
      }
    })
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => handleResponse(res))
    .then(data => data)
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error("Произошла ошибка"));
}


