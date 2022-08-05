import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const popups = document.querySelectorAll('.popup');
const generalForm = document.querySelector('.popup__form');
const nameInput = generalForm.querySelector('.popup__input_field_name');
const jobInput = generalForm.querySelector('.popup__input_field_info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
export const list = document.querySelector('.elements__list');
const formInputName = document.querySelector('.popup__input_card_name');
const formInputLink = document.querySelector('.popup__input_card_link');
const popupCardsForm = document.querySelector('.popup__form_type_cards');
export const popupPictureImage = document.querySelector('.popup__image');
export const popupPictureTitle = document.querySelector('.popup__title_type_picture');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
export const popupPicture = document.querySelector('.popup_type_picture');
const buttonEditProfile = document.querySelector('.profile__rectangle-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupProfileForm = document.querySelector('.popup__form_profile');


export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

// Закрытие попапа на кнопку ESC
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    };
};

// ЗАКРЫТИЕ ПОПАПОВ НА ОВЕРЛЕЙ И НА КРЕСТИК
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
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
    formCardsOnValidate.toggleButtonState();
    closePopup(popupCards);
};

popupCardsForm.addEventListener('submit', handleSubmitPopupCardsForm);
generalForm.addEventListener('submit', handleSubmitProfileForm);

// СОЗДАНИЕ КАРТОЧЕК //////

function handleCardClick(name, link) {
    popupPictureImage.src = link;
    popupPictureImage.alt = name;
    popupPictureTitle.textContent = name;
    openPopup(popupPicture);
}

function createCard(item) {
    const card = new Card(item, '.item_template', handleCardClick);
    const cardElement = card.generateCard(item);
    return cardElement;
}

function renderCard(item) {
    const cardElement = createCard(item);
    list.prepend(cardElement);
};

function renderItems() {
    initialCards.forEach(renderCard);
};

renderItems();


// ВАЛИДАЦИЯ //////
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};


const formCardsOnValidate = new FormValidator(settings, popupCardsForm);
formCardsOnValidate.enableValidation();

const formProfileOnValidate = new FormValidator(settings, popupProfileForm);
formProfileOnValidate.enableValidation();


buttonAddCard.addEventListener('click', () => { 
    openPopup(popupCards);
    popupCardsForm.reset();
    formCardsOnValidate.resetValidation();
});

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupProfile);
    formProfileOnValidate.resetValidation();
});