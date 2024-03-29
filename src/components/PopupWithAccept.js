import { Popup } from "./Popup.js";

export class PopupWithAccept extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = document.querySelector(
      ".popup__submit-button_type_accept"
    );
    this._card = {};
  }

  open(card) {
    super.open();
    console.log(card);
    return (this._card = card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._card);
    });
  }
}
