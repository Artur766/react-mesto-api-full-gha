// export const BASE_URL = "http://localhost:3000";

export const BASE_URL = "https://api.arturito.nomoredomains.rocks";

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => handleResponse(res))
    .then(res => res)
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ email, password })
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
