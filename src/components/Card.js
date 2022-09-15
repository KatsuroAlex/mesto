export class Card {
  constructor(data, templateSelector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
  //constructor(data, templateSelector, handleCardClick, handleTrashClick, userId) {
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
    this._elementDeleteCard = this._element.querySelector(
      ".element__delete-card"
    );

    this._elementPhoto = this._element.querySelector(".element__photo");
    this._elementText = this._element.querySelector(".element__text");
    this._like = this._element.querySelector('.element__like');
    this._elementText.textContent = this._name;
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;

    ///корзина
    if(!(this._idOwner === this._userId)){this._elementDeleteCard.remove()};
    this._setEventListeners();


    ///лайки
    
    
    this.setLikes(this._likes);
    return this._element;
  }

  _checkLike() {
    return this._likes.some(like => {
      return like._id === this._userId;
    });
  }

  //метод принимает данные лайков карточки и обновляет отображение карточки
  setLikes(arr) {
    this._element.querySelector('.element__sum').textContent = arr.length;
    this._likes = arr;
    if (this._checkLike()) {
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }
  }





  // likeCounter(number) {
  //   this._likeButton.classList.toggle("element__like_active");
  //   this.numberLikes.textContent = number;
  // }



  _setEventListeners() {
    // this._likeButton = this._element.querySelector(".element__like");
    //this._elementPhoto = this._element.querySelector(".element__photo");
    // this._elementDeleteCard = this._element.querySelector(
    //   ".element__delete-card"
    // );
    // this._elementText = this._element.querySelector(".element__text");
    // this._like = this._element.querySelector('.element__like');
    // this._elementText.textContent = this._name;
    // this._elementPhoto.src = this._link;
    // this._elementPhoto.alt = this._name;



    this._elementPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._elementDeleteCard.addEventListener("click", () => {
      this._handleTrashClick();
    });


    // this._likeButton.addEventListener("click", () => {
    //   this._toggleLike();
    //   this._handleLikeClick();
    // });

    this._like.addEventListener("click", () => {
      this._handleLikeClick(this._cardId, this._checkLike(), this);
    });

  }

  // _toggleLike() {
  //   this._likeButton.classList.toggle("element__like_active");
  // }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
