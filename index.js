let editButton = document.querySelector('.profile__rectangle-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__info');
let popupSubmitButton = document.querySelector('.popup__submit-button')
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


function openPopup(event) {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}
editButton.addEventListener('click', openPopup);


function closePopup(event) {
    popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    closePopup();
}
// console.log(formSubmitHandler())


formElement.addEventListener('submit', formSubmitHandler);






