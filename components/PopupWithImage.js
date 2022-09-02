import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPictureImage = document.querySelector(".popup__image");
    this._popupPictureTitle = document.querySelector(
      ".popup__title_type_picture"
    );
  }

  open(name, link) {
    super.open();
    this._popupPictureImage.src = link;
    this._popupPictureImage.alt = name;
    this._popupPictureTitle.textContent = name;
  }
}
