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
  popupChangeAvatarForm,
} from "../utils/constants.js";






//////СОЗДАНИЕ первоначальных карточек и их выгрузка на страницу
function createCard(data, userId) {
  const card = new Card(
    data,
    '#item_template',
    handleCardClick,
    () => {
      console.log(popupWithAccept.open(card));
      popupWithAccept.open(card)
    },
    ///лайки

    (id, isLiked, card) => {
      if (isLiked) {
        //отправляем запрос снятия лайка
        api.removeLike(id)
        .then((data) => {
          card.setLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        //отправляем запрос на установку лайка
        api.setLike(id)
        .then((data) => {
          card.setLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },



    // (evt) => {
    //   if (!evt.target.classList.contains('element__like_active')){
    //     addLike(card)
    //   }
    //   else{
    //     removeLike(card)
    //   }
    // },


    userId,
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

/////ЛАЙКИ

// function addLike(card) {
//   api.setLike(card._cardId)
//   .then((res) => {
//     card.likeCounter(res.likes.length)
//   })
//   .catch(err => console.log(`Error: ${err}`))
// }

// function removeLike(card) {
//   api.deleteLike(card._id)
//     .then((res) => {
//       card.likeCounter(res.likes.length)
//     })
//     .catch(err => console.log(`Error: ${err}`));
// }


////Попап c аватаром
const buttonOpenPopupAvatar = document.querySelector('.profile__edit-button');
const popupAvatar = new PopupWithForm(".popup_type_avatar", (data) => {
  console.log(data);
  api.saveProfileAvatar(data)
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

buttonOpenPopupAvatar.addEventListener('click', () => {
  popupAvatar.open()
})













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
  .then((data) => {
    defaultCardList.addItem(createCard(data, data.owner._id));
    console.log(data);
    console.log(data.owner.id)
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

const formAvatarOnValidate = new FormValidator(settings, popupChangeAvatarForm);
formAvatarOnValidate.enableValidation();



///API
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-49");
console.log(api.getInitialCards());
console.log(api.getProfileData());

Promise.all([
  api.getProfileData(),
  api.getInitialCards()
])
.then((values) => {
  console.log(values[0]._id);
  userInfo.setUserInfo(values[0]);
  console.log(values[1]);
  defaultCardList.renderItems(values[1], values[0]._id);
})

.catch((err) => {
  console.log(err);
});


// let userId = ''


// api.getProfileData()
// .then((userData) => {
//   userId = userData._id;
// });
// console.log(userId)
