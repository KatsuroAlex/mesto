export class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._userUrl = `${this._baseUrl}/users/me`;
    
    // this._likesUrl = `${this._baseUrl}/cards/likes`;
    // this._key = headers['authorization'];
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      // .then((res) => {
      //   console.log(res);
      // })
  }

  getProfileData() {
    return fetch(this._userUrl, {
      headers: {
        authorization: "662b4a69-3985-425e-a15b-c46bfd55b560",
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
      // .then((res) => {
      //   console.log(res);
      // })
  }





  // другие методы работы с API
}
