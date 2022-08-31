export class UserInfo {
  constructor({ userName, userInfo }) {
    this._elementName = document.querySelector(userName);
    console.log(this._elementName);
    this._elementInfo = document.querySelector(userInfo);
    console.log(this._elementInfo);
  }

  getUserInfo() {
    const userData = {
      name: this._elementName.textContent,
      info: this._elementInfo.textContent,
    };
    console.log(userData);
    return userData;
  }

  setUserInfo(data) {
    this._elementName.textContent = data.name;
    this._elementInfo.textContent = data.info;
    console.log(data.name);
    console.log(data.info);
  }
}
