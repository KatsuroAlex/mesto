import { Popup } from "./Popup.js";

export class PopupWithAccept extends Popup {
  constructor(popupSelector, handleSubmit) {
  //constructor(popupSelector) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popupSelector.querySelector(".popup__submit-button");

  }

  // setSubmit(submit) {
  //   this._handleSubmitAccept = submit;
  // }



  setEventListeners() {
    super.setEventListeners();
    
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })



  }

  // setEventListeners() {
  //   super.setEventListeners();

    // this._submitButton.addEventListener("submit", (evt) => {
    //   evt.preventDefault();
    //   this._handleSubmit();
    // });
 // }
}
