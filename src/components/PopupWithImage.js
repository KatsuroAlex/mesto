import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPictureImage = this._elementPopup.querySelector(".popup__image");
    this._popupPictureTitle = this._elementPopup.querySelector(
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
