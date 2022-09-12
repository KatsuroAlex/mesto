export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._elementPopup = document.querySelector(this._popupSelector);
    this._closeButton = document.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._elementPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._elementPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());

    console.log(this._popupSelector);

    this._elementPopup.addEventListener("mousedown", (event) => {
      if (
        event.target === event.currentTarget ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
