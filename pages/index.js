import { initialCards, settings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

// ЗАМЕНИТЬ НА ИМПОРТ КОНСТАНТ
const popups = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const list = document.querySelector(".elements__list");
const formInputName = document.querySelector(".popup__input_card_name");
const formInputLink = document.querySelector(".popup__input_card_link");
const popupPictureImage = document.querySelector(".popup__image");
const popupPictureTitle = document.querySelector(".popup__title_type_picture");
const popupProfile = document.querySelector(".popup_type_profile");
const popupCards = document.querySelector(".popup_type_cards");
const popupPicture = document.querySelector(".popup_type_picture");
const buttonEditProfile = document.querySelector(".profile__rectangle-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupCardsForm = document.querySelector(".popup__form_type_cards");
const popupProfileForm = document.querySelector(".popup__form_profile");
const nameInput = popupProfileForm.querySelector(".popup__input_field_name");
const jobInput = popupProfileForm.querySelector(".popup__input_field_info");

function createCard(data) {
  const defaultCardList = new Card(
    {
      name: data.name,
      link: data.link,
      handleCardClick: () => {
        popupWithImage.open(data.name, data.link);
      },
    },
    ".item_template"
  );
  const newCard = defaultCardList.generateCard();
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

//СОЗДАНИЕ первоначальных карточек и их выгрузка на страницу КАРТОЧЕК ////// (работает)
// const defaultCardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const card = new Card(item, ".item_template", handleCardClick);
//       const cardElement = card.generateCard();
//       defaultCardList.addItem(cardElement);
//     },
//   },
//   ".elements__list"
// );
// defaultCardList.renderItems();

const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

// открытие попапа с картинкой (не работает)
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Отправка формы popupCards
function handleSubmitPopupCardsForm(evt) {
  evt.preventDefault();
  defaultCardList.renderItems();
  popupCardsForm.reset();
  popupWithFormCards.close();

  //   renderCard({ name: formInputName.value, link: formInputLink.value });
}

const popupWithFormProfile = new PopupWithForm(popupProfile);
popupWithFormProfile.setEventListeners();
const popupWithFormCards = new PopupWithForm(popupCards);
popupWithFormCards.setEventListeners();

// ОТПРАВКА ФОРМЫ popupProfile (работает, но есть ошибка в консоли пр инажатии на отправку)
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupWithFormProfile.close();
}

popupCardsForm.addEventListener("submit", handleSubmitPopupCardsForm);
popupProfileForm.addEventListener("submit", handleSubmitProfileForm);

// ВАЛИДАЦИЯ //////
const formCardsOnValidate = new FormValidator(settings, popupCardsForm);
formCardsOnValidate.enableValidation();

const formProfileOnValidate = new FormValidator(settings, popupProfileForm);
formProfileOnValidate.enableValidation();

buttonAddCard.addEventListener("click", () => {
  popupWithFormCards.open();
  popupCardsForm.reset();
  formCardsOnValidate.resetValidation();
});

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupWithFormProfile.open();
  formProfileOnValidate.resetValidation();
});
