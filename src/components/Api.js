export class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._avatarUrl = `${this._baseUrl}/users/me/avatar`;
    this._likesUrl = `${this._baseUrl}/likes`;
  }

  //////// загружаем карточки с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //////// загружаем данные пользователя с сервера
  getProfileData() {
    return fetch(this._userUrl, {
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //////// сохраняем данные пользователя (профиль) на сервере
  saveProfileInfo({ name, about }) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //////// сохраняем аватар пользователя (профиль) на сервере
  saveProfileAvatar(src) {
    return fetch(this._avatarUrl, {
      method: "PATCH",
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: src.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //////// добавляем новую карточку на сервер
  postNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  ///////удаление карточки пользователя с сервера
  deleteCard(id) {
    console.log(id);
    return fetch(`${this._cardsUrl}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  ////////установка лайка карточке
  likeCard(itemId) {
    return fetch(`${this._likesUrl}/${itemId}`, {
      method: "PUT",
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  ////////удаление лайка с карточки (ПОМЕНЯТЬ ТОКЕН НА 50 КОГОРТУ)
  dislikeCard(itemId) {
    return fetch(`${this._likesUrl}/${itemId}`, {
      method: "DELETE",
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
