import {renderCard} from './Card.js';


const popups = document.querySelectorAll('.popup');
const popupContainer = document.querySelector('.popup__container');
const form = document.querySelector('.popup__form');
const nameInput = form.querySelector('.popup__input_field_name');
const jobInput = form.querySelector('.popup__input_field_info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardElement = document.querySelector('.element');
const buttonLike = document.querySelector('.element__like');
const elementPhoto = document.querySelector('.element__photo');
const itemTemplate = document.querySelector('.item_template').content;
export const list = document.querySelector('.elements__list');
const cardsFormButton = document.querySelector('.popup__submit-button_type_cards');
const formInputName = document.querySelector('.popup__input_card_name');
const formInputLink = document.querySelector('.popup__input_card_link');
const popupCardsForm = document.querySelector('.popup__form_type_cards');
export const popupPictureImage = document.querySelector('.popup__image');
export const popupPictureTitle = document.querySelector('.popup__title_type_picture');
const elementText = document.querySelector('.element__text');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
export const popupPicture = document.querySelector('.popup_type_picture');
const buttonEditProfile = document.querySelector('.profile__rectangle-button');
const buttonAddCard = document.querySelector('.profile__add-button');



function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

// Закрытие попапа на кнопку ESC
function closePopupEsc (evt) {
    if(evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    };
};

// ЗАКРЫТИЕ ПОПАПОВ НА ОВЕРЛЕЙ И НА КРЕСТИК
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if(event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
            closePopup(popup);
        };
    });
});

// ОТПРАВКА ФОРМЫ popupProfile
function handleSubmitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
};

// Отправка формы popupCards
function handleSubmitPopupCardsForm(evt) {
    evt.preventDefault();
    renderCard({ name: formInputName.value, link: formInputLink.value });
    popupCardsForm.reset();
    cardsFormButton.disabled = true;
    cardsFormButton.classList.add('popup__submit-button_inactive');
    closePopup(popupCards);
};

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;  
    openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => { openPopup(popupCards) });
popupCardsForm.addEventListener('submit', handleSubmitPopupCardsForm);
form.addEventListener('submit', handleSubmitProfileForm);



// // ЗАГРУЗКА КАРТ НА СТРАНИЦУ ПРИ ОТКРЫТИИ 
// function createCard(element) {
//     const cardElement = itemTemplate.cloneNode(true);
//     const cardElementPhoto = cardElement.querySelector('.element__photo');
//     cardElement.querySelector('.element__text').textContent = element.name;
//     cardElementPhoto.src = element.link;
//     cardElementPhoto.alt = element.name;
//     // Добавляем лайки
//     cardElement.querySelector('.element__like').addEventListener('click', toggleLike);
//     cardElementPhoto.addEventListener('click', function (event) {
//         openPopup(popupPicture);
//         popupPictureImage.src = event.target.src;
//         popupPictureTitle.textContent = element.name;
//     });
//     // Обработчик для удаления карточек
//     const buttonDeleteCard = cardElement.querySelector('.element__delete-card');
//     buttonDeleteCard.addEventListener('click', handleDelete);
//     return cardElement;
// };

// function toggleLike(event) {
//     event.target.classList.toggle('element__like_active');
// };

// function renderCard(cardElement) {
//     list.prepend(createCard(cardElement));
// }

// // Добавление 6 карточек из массива
// function renderItems() {
//     initialCards.forEach(renderCard);
// };

// // Кнопка удаления карточки
// function handleDelete(evt) {
//     evt.target.closest('.element').remove();
// };





// renderItems();



// const initialCards = [
//     {
//         name: 'Архыз',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//         name: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         name: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         name: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         name: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         name: 'Байкал',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ];


// class Card {
//     constructor(data, templateSelector) {
//         this._name = data.name;
//         this._link = data.link;
//         this._templateSelector = templateSelector;
//     }


//     _getTemplate() {
//         const cardElement = document
//           .querySelector(this._templateSelector)
//           .content 
//           .querySelector('.element')
//           .cloneNode(true);
//         return cardElement;
//     }

//     generateCard() {
//         this._element = this._getTemplate();
//         this._setEventListeners();
//         this._element.querySelector('.element__text').textContent = this._name;
//         this._element.querySelector('.element__photo').src = this._link;
//         return this._element;
//     }

//     _handleOpenPopup() {
//         document.querySelector('.popup__image').src = this._link;
//         document.querySelector('.popup__title_type_picture').textContent = this._name;
//         document.querySelector('.popup_type_picture').classList.add('popup_opened');
//     }

//     _setEventListeners() {
//         this._element.querySelector('.element__photo').addEventListener('click', () => {
//           this._handleOpenPopup();
//         });

//         this._element.querySelector('.element__like').addEventListener('click', () => {
//             this._toggleLike();
//         });

//         this._element.querySelector('.element__delete-card').addEventListener('click', () => {
//             this._handleDeleteCard();
//         })
//     }

//     _toggleLike() {
//         this._element.querySelector('.element__like').classList.toggle('element__like_active');
//     }

//     _handleDeleteCard() {
//         const deleteItem = this._element.querySelector('.element__delete-card').closest('.element');
//         deleteItem.remove();
//     }
// }

// function renderCard(item) {
//     const card = new Card(item, '.item_template');
//     const cardElement = card.generateCard();
//     document.querySelector('.elements__list').prepend(cardElement);
//     return cardElement;
// }

// function renderItems() {
//     initialCards.forEach(renderCard);
// };

// renderItems();


