import { apiConfig } from "./utils";

class Api {
  constructor(config) {
    this.headers = config.headers;
    this.baseUrl = config.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json(); // читает ответ с сервера и возвращает промис
    }
    return Promise.reject(new Error("Произошла ошибка"))
  }


  createCard(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleResponse)
  }

  getUserInformation() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleResponse)
  }

  setUserInfo(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._handleResponse)
  }

  setUserAvatar(dataUrl) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUrl)
    })
      .then(this._handleResponse)
  }

  deleteCard(idCard) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleResponse);
  }

  changeLikeCardStatus(idCard, isLiked) {
    const token = localStorage.getItem("jwt");
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(this._handleResponse);
    } else {
      return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(this._handleResponse);
    }

  }
}

const api = new Api(apiConfig);

export default api;