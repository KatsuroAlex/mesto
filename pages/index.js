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

//СОЗДАНИЕ первоначальных карточек и их выгрузка на страницу КАРТОЧЕК ////// (работает)
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

// const defaultCardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       defaultCardList.addItem(createCard(item));
//     },
//   },
//   ".elements__list"
// );
defaultCardList.renderItems();

const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

// открытие попапа с картинкой (работает)
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}









// Отправка формы popupCards
const popupWithFormCards = new PopupWithForm(popupCards, (item) => {
  defaultCardList.addItem(createCard(item));
});
popupWithFormCards.setEventListeners();

function handleSubmitPopupCardsForm(evt) {
  evt.preventDefault();
  popupCardsForm.reset();
  popupWithFormCards.close();

  //   renderCard({ name: formInputName.value, link: formInputLink.value });
}

popupCardsForm.addEventListener("submit", handleSubmitPopupCardsForm);











const popupWithFormProfile = new PopupWithForm(
  popupProfile,
//   (item) => {
//     defaultCardList.addItem(createCard(item))}
);
popupWithFormProfile.setEventListeners();


// ОТПРАВКА ФОРМЫ popupProfile (работает, но есть ошибка в консоли при нажатии на отправку)
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupWithFormProfile.close();
}


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
