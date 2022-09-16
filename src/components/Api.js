export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._avatarUrl = `${this._baseUrl}/users/me/avatar`;
    this._likesUrl = `${this._baseUrl}/cards/cardId/likes`;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //////// загружаем карточки с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //////// загружаем данные пользователя с сервера
  getProfileData() {
    return fetch(this._userUrl, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //////// сохраняем данные пользователя (профиль) на сервере
  saveProfileInfo({ name, about }) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //////// сохраняем аватар пользователя (профиль) на сервере
  saveProfileAvatar(src) {
    return fetch(this._avatarUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: src.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //////// добавляем новую карточку на сервер
  postNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  ///////удаление карточки пользователя с сервера
  deleteCard(id) {
    console.log(id);
    return fetch(`${this._cardsUrl}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  ////////установка лайка карточке
  setLike(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  ////////удаление лайка с карточки (ПОМЕНЯТЬ ТОКЕН НА 50 КОГОРТУ)
  removeLike(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}
