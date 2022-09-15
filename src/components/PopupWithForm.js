import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    //this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._popupForm = this._elementPopup.querySelector(".popup__form");
    //this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._inputList = this._elementPopup.querySelectorAll(".popup__input");
    this._buttonSave = this._popupForm.querySelector('.popup__submit-button');
    this._defaultButton = this._buttonSave.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    //this._popupSelector.addEventListener("submit", (evt) => {
      this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }


  saveProgress(inLoad) {
    if(inLoad){
      this._buttonSave.textContent = `Cохранение...`;
    } else {
      this._buttonSave.textContent = this._defaultButton;
    }
  }



}
