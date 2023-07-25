import { toggleSaving } from "../utlis/utils";

export default class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/v1/cohort-3-en/cards`, {
      method: "GET",
      headers: this._headers,
      //   headers: {
      //     authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
      //   },
    }).then(this._processResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/v1/cohort-3-en/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._processResponse);
  }

  updateUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/v1/cohort-3-en/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then(this._processResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/v1/cohort-3-en/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(this._processResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/v1/cohort-3-en/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }

  updateUserAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/v1/cohort-3-en/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._processResponse);
  }

  toggleLikeOnCard(cardId, isLike) {
    return fetch(`${this._baseUrl}/v1/cohort-3-en/cards/likes/${cardId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._processResponse);
  }
}
