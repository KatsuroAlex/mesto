import { popupPictureImage, popupPictureTitle, popupPicture } from './index.js';


export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    };

    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content 
          .querySelector('.element')
          .cloneNode(true);
        return cardElement;
    };

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__photo').src = this._link;
        return this._element;
    };

    _handleOpenPopupPicture() {
        popupPictureImage.src = this._link;
        popupPictureTitle.textContent = this._name;
        popupPicture.classList.add('popup_opened');
    };

    _setEventListeners() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
          this._handleOpenPopupPicture();
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._toggleLike();
        });

        this._element.querySelector('.element__delete-card').addEventListener('click', () => {
            this._handleDeleteCard();
        });
    };

    _toggleLike() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    _handleDeleteCard() {
        const deleteItem = this._element.querySelector('.element__delete-card').closest('.element');
        deleteItem.remove();
    };
};

// export function renderCard(item) {
//     const card = new Card(item, '.item_template');
//     const cardElement = card.generateCard();
//     list.prepend(cardElement);
//     return cardElement;
// };

// function renderItems() {
//     initialCards.forEach(renderCard);
// };

// renderItems();
