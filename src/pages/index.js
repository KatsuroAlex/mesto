import "./index.css"; // добавляем импорт главного файла стилей

// import { initialCards, settings } from "../utils/constants.js";
import { settings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithAccept } from "../components/PopupWithAccept.js";

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


//////СОЗДАНИЕ первоначальных карточек и их выгрузка на страницу
function createCard(data, userId) {
  const card = new Card(
    data,
    //{ name: data.name, link: data.link }, 
    //".item_template",
    '#item_template',
    handleCardClick,
    () => {
      console.log(popupWithAccept.open(card));
      popupWithAccept.open(card)
    },
    (evt) => {
      if (!evt.target.classList.contains('element__like_active')){
        addLike(card)
      }
      else{
        removeLike(card)
      }
    },
    userId,

  );
  const newCard = card.generateCard();
  return newCard;
}

const defaultCardList = new Section(
  {
    renderer: (item, id) => {
      defaultCardList.addItem(createCard(item, id));
    },
  },
  ".elements__list"
);

/////ЛАЙКИ

// addLike(card) {
//   api.setLike(card._cardId)
//   then((res) => {

//   })
// }









////Удаление карточки popupCards
const popupWithAccept = new PopupWithAccept(".popup_type_accept", (card) => {
  console.log(card);
  console.log(card._cardId);
  api.deleteCard(card._cardId)
  .then(() => {
    card.handleDeleteCard();
    popupWithAccept.close();
  })
  .catch((err) => {
    console.log(err);
  });

});
popupWithAccept.setEventListeners();


// Отправка формы popupCards и добавление новой карточки
const popupWithFormCards = new PopupWithForm(".popup_type_cards", (data) => {
  console.log(data);
  api.postNewCard(data)
  .then((item, id) => {
    defaultCardList.addItem(createCard(item, id));
    popupWithFormCards.close();
  })
  .catch((err) => {
    console.log(err);
  })
});
popupWithFormCards.setEventListeners();





buttonAddCard.addEventListener("click", () => {
  console.log(popupWithFormCards);
  popupWithFormCards.open();
  popupCardsForm.reset();
  formCardsOnValidate.resetValidation();
});

// открытие попапа с картинкой
const popupWithImage = new PopupWithImage(".popup_type_picture");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}


















//Функционал popupProfile по добавлению текста пользователя
const userInfo = new UserInfo({
  userName: ".profile__title",
  userInfo: ".profile__subtitle",
  userAvatar: ".profile__avatar"
});

const popupWithFormProfile = new PopupWithForm(".popup_type_profile", (data) => {
  console.log(data);
  api.saveProfileInfo(data)
  .then((item) => {
    userInfo.setUserInfo(item);
    console.log(userInfo.setUserInfo(item));
    popupWithFormProfile.close();
  })
  .catch((err) => {
    console.log(err);
  })
});
popupWithFormProfile.setEventListeners();


buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupWithFormProfile.setInputValues(userData);
  
  console.log(userInfo.getUserInfo());
  popupWithFormProfile.open();
  formProfileOnValidate.resetValidation();
});







// Валидация инпутов
const formCardsOnValidate = new FormValidator(settings, popupCardsForm);
formCardsOnValidate.enableValidation();

const formProfileOnValidate = new FormValidator(settings, popupProfileForm);
formProfileOnValidate.enableValidation();


///API
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-49");
console.log(api.getInitialCards());
console.log(api.getProfileData());

Promise.all([
  api.getProfileData(),
  api.getInitialCards()
])
.then((values) => {
  userInfo.setUserInfo(values[0]);
  defaultCardList.renderItems(values[1], values[0]._id);
})

.catch((err) => {
  console.log(err);
});


// let userId = ''
// api.getProfileData().then((res) => userId = res._id);