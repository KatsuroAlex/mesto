import "./index.css"; // добавьте импорт главного файла стилей

import { initialCards, settings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import {
  popupProfile,
  popupCards,
  popupPicture,
  buttonEditProfile,
  buttonAddCard,
  popupCardsForm,
  popupProfileForm,
  nameInput,
  jobInput,
} from "../utils/constants.js";

//СОЗДАНИЕ первоначальных карточек и их выгрузка на страницу
function createCard(data) {
  const card = new Card(
    { name: data.name, link: data.link },
    ".item_template",
    handleCardClick
  );
  const newCard = card.generateCard();
  return newCard;
}

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    },
  },
  ".elements__list"
);
defaultCardList.renderItems();

// Отправка формы popupCards и добавление новой карточки
const popupWithFormCards = new PopupWithForm(popupCards, (item) => {
  defaultCardList.addItem(createCard(item));
  popupWithFormCards.close();
});
popupWithFormCards.setEventListeners();

// открытие попапа с картинкой
const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//Функционал popupProfile по добавлению текста пользователя
const userInfo = new UserInfo({
  userName: ".profile__title",
  userInfo: ".profile__subtitle",
});
const popupWithFormProfile = new PopupWithForm(popupProfile, (data) => {
  console.log(data);
  userInfo.setUserInfo(data);
  popupWithFormProfile.close();
});
popupWithFormProfile.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupWithFormProfile.setInputValues(userData);

  // nameInput.value = userData.name;
  // jobInput.value = userData.info;
  console.log(userInfo.getUserInfo());
  console.log(nameInput.value);
  console.log(jobInput.value);
  popupWithFormProfile.open();
  formProfileOnValidate.resetValidation();
});

// Валидация инпутов
const formCardsOnValidate = new FormValidator(settings, popupCardsForm);
formCardsOnValidate.enableValidation();

const formProfileOnValidate = new FormValidator(settings, popupProfileForm);
formProfileOnValidate.enableValidation();

buttonAddCard.addEventListener("click", () => {
  popupWithFormCards.open();
  popupCardsForm.reset();
  formCardsOnValidate.resetValidation();
});
