export class UserInfo {
  constructor(userName, userInfo) {
    this._elementName = document.querySelector(userName);
    this._elementInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      name: this._elementName.textContent,
      info: this._elementInfo.text.Content,
    };
  }

  setUserInfo({name, job}) {
    this._elementName.textContent = name;
    this._elementInfo.textContent = about;

  
  }
}
