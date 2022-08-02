import { initialCards } from './cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


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
const popupProfileForm = document.querySelector('.popup__form_profile');


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


// СОЗДАНИЕ КАРТОЧЕК //////

function renderCard(item) {
    const card = new Card(item, '.item_template');
    const cardElement = card.generateCard();
    list.prepend(cardElement);
    return cardElement;
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