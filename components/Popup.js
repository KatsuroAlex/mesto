export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = document.querySelector(".popup__close");
    // this._popupItem = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      //   const popupActive = document.querySelector(".popup_opened");
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());

    this._popupSelector.addEventListener("mousedown", (event) => {
      if (
        event.target === event.currentTarget ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });

    // this._popupSelector.addEventListener("keydown", this._handleEscClose());
  }
}

// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupEsc);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupEsc);
// }

// // Закрытие попапа на кнопку ESC
// function closePopupEsc(evt) {
//   if (evt.key === "Escape") {
//     const popupActive = document.querySelector(".popup_opened");
//     closePopup(popupActive);
//   }
// }

// // ЗАКРЫТИЕ ПОПАПОВ НА ОВЕРЛЕЙ И НА КРЕСТИК
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (event) => {
//     if (
//       event.target === event.currentTarget ||
//       event.target.classList.contains("popup__close")
//     ) {
//       closePopup(popup);
//     }
//   });
// });
