import {list, popupPictureImage, popupPictureTitle, popupPicture} from './index.js';



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content 
          .querySelector('.element')
          .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__photo').src = this._link;
        return this._element;
    }

    _handleOpenPopup() {
        popupPictureImage.src = this._link;
        popupPictureTitle.textContent = this._name;
        popupPicture.classList.add('popup_opened');
    }

    _setEventListeners() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
          this._handleOpenPopup();
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._toggleLike();
        });

        this._element.querySelector('.element__delete-card').addEventListener('click', () => {
            this._handleDeleteCard();
        })
    }

    _toggleLike() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleDeleteCard() {
        const deleteItem = this._element.querySelector('.element__delete-card').closest('.element');
        deleteItem.remove();
    }
}

export function renderCard(item) {
    const card = new Card(item, '.item_template');
    const cardElement = card.generateCard();
    list.prepend(cardElement);
    return cardElement;
}

function renderItems() {
    initialCards.forEach(renderCard);
};

renderItems();














// // ЗАГРУЗКА КАРТ НА СТРАНИЦУ ПРИ ОТКРЫТИИ 
// function createCard(element) {
//     const cardElement = itemTemplate.cloneNode(true);
//     const cardElementPhoto = cardElement.querySelector('.element__photo');
//     cardElement.querySelector('.element__text').textContent = element.name;
//     cardElementPhoto.src = element.link;
//     cardElementPhoto.alt = element.name;




//     cardElementPhoto.addEventListener('click', function (event) {
//         openPopup(popupPicture);
//         popupPictureImage.src = event.target.src;
//         popupPictureTitle.textContent = element.name;
//     });
//     return cardElement;
// };



// // Кнопка удаления карточки
// function handleDelete(evt) {
//     evt.target.closest('.element').remove();
// };


