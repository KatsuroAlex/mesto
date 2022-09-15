export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const popupProfile = document.querySelector(".popup_type_profile");
const popupCards = document.querySelector(".popup_type_cards");
const popupPicture = document.querySelector(".popup_type_picture");
const buttonEditProfile = document.querySelector(".profile__rectangle-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupCardsForm = document.querySelector(".popup__form_type_cards");
const popupProfileForm = document.querySelector(".popup__form_profile");
const nameInput = popupProfileForm.querySelector(".popup__input_field_name");
const jobInput = popupProfileForm.querySelector(".popup__input_field_info");
const popupChangeAvatarForm = document.querySelector(
  ".popup__form_type_avatar"
);

export {
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
};
