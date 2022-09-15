import "./index.css"; // добавляем импорт главного файла стилей

import { settings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithAccept } from "../components/PopupWithAccept.js";

import {
  buttonEditProfile,
  buttonAddCard,
  popupCardsForm,
  popupProfileForm,
  popupChangeAvatarForm,
} from "../utils/constants.js";

//////СОЗДАНИЕ первоначальных карточек и их выгрузка на страницу
function createCard(data, userId) {
  const card = new Card(
    data,
    "#item_template",
    handleCardClick,
    () => {
      console.log(popupWithAccept.open(card));
      popupWithAccept.open(card);
    },
    ///лайки
    (id, isLiked, card) => {
      if (isLiked) {
        //отправляем запрос на снятие лайка
        api
          .removeLike(id)
          .then((data) => {
            card.setupLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //отправляем запрос на установку лайка
        api
          .setLike(id)
          .then((data) => {
            card.setupLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    userId
  );
  const newCard = card.generateCard();
  return newCard;
}

const defaultCardList = new Section(
  {
    renderer: (item, userId) => {
      defaultCardList.addItem(createCard(item, userId));
    },
  },
  ".elements__list"
);

////Попап c аватаром
const buttonOpenPopupAvatar = document.querySelector(".profile__edit-button");
const popupAvatar = new PopupWithForm(".popup_type_avatar", (data) => {
  popupAvatar.savingProgress(true);
  console.log(data);
  api
    .saveProfileAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
      formAvatarOnValidate.resetValidation();
    })
    .catch((err) => {
      console.log(err);
    });
});
popupAvatar.setEventListeners();

buttonOpenPopupAvatar.addEventListener("click", () => {
  popupAvatar.open();
});

////Удаление карточки popupCards
const popupWithAccept = new PopupWithAccept(".popup_type_accept", (card) => {
  console.log(card);
  console.log(card._cardId);
  api
    .deleteCard(card._cardId)
    .then(() => {
      card.handleDeleteCard();
      popupWithAccept.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAccept.savingProgress(false);
    });
});
popupWithAccept.setEventListeners();

// Отправка формы popupCards и добавление новой карточки
const popupWithFormCards = new PopupWithForm(".popup_type_cards", (data) => {
  popupWithFormCards.savingProgress(true);
  console.log(data);
  api
    .postNewCard(data)
    .then((data) => {
      defaultCardList.addItem(createCard(data, data.owner._id));
      console.log(data);
      console.log(data.owner.id);
      popupWithFormCards.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormCards.savingProgress(false);
    });
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
  userAvatar: ".profile__avatar",
});

const popupWithFormProfile = new PopupWithForm(
  ".popup_type_profile",
  (data) => {
    popupWithFormProfile.savingProgress(true);
    console.log(data);
    api
      .saveProfileInfo(data)
      .then((item) => {
        userInfo.setUserInfo(item);
        console.log(userInfo.setUserInfo(item));
        popupWithFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormProfile.savingProgress(false);
      });
  }
);
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

const formAvatarOnValidate = new FormValidator(settings, popupChangeAvatarForm);
formAvatarOnValidate.enableValidation();

///API
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-50");
console.log(api.getInitialCards());
console.log(api.getProfileData());

Promise.all([api.getProfileData(), api.getInitialCards()])
  .then((values) => {
    console.log(values[0]._id);
    userInfo.setUserInfo(values[0]);
    console.log(values[1]);
    defaultCardList.renderItems(values[1], values[0]._id);
  })

  .catch((err) => {
    console.log(err);
  });
