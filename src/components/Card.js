export class Card {
  constructor(data, templateSelector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._cardId = data._id;
    this._idOwner = data.owner._id;
    this._likes = data.likes;
  }
  // получаем разметку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementText.textContent = this._name;
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    ///корзина
    if(!(this._idOwner === this._userId)){this._elementDeleteCard.remove()};

    





    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like");
    this._elementPhoto = this._element.querySelector(".element__photo");
    this._elementDeleteCard = this._element.querySelector(
      ".element__delete-card"
    );
    this._elementText = this._element.querySelector(".element__text");

    this._elementPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
      this._handleLikeClick();
    });

    this._elementDeleteCard.addEventListener("click", () => {
      this._handleTrashClick();
    });




  }

  _toggleLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  likeCounter() {

  }




}
