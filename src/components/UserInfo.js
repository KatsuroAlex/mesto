export class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._elementName = document.querySelector(userName);
    console.log(this._elementName);
    this._elementInfo = document.querySelector(userInfo);
    console.log(this._elementInfo);
    this._elementAvatar = document.querySelector(userAvatar);
    console.log(this._elementAvatar);
  }

  getUserInfo() {
    const userData = {
      name: this._elementName.textContent,
      about: this._elementInfo.textContent,
    };
    console.log(userData);
    return userData;
  }

  setUserInfo(data) {
    this._elementName.textContent = data.name;
    this._elementInfo.textContent = data.about;
    this._elementAvatar.src = data.avatar;
    console.log(data.name);
    console.log(data.about);
    console.log(data.avatar);
  }
}
