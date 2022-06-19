let editButton = document.querySelector('.profile__rectangle-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
let formElement = document.querySelector('.popup__form') 
let nameInput = formElement.querySelector('.popup__input_field_name') 
let jobInput = formElement.querySelector('.popup__input_field_info') 
let popupSubmitButton = document.querySelector('.popup__submit-button')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let likeButton = document.querySelector('.elements__like')


function openPopup(event) {
    popup.classList.add('popup_opened')
    nameInput.value = profileTitle.textContent
    jobInput.value = profileSubtitle.textContent
}


function closePopup(event) {
    popup.classList.remove('popup_opened')
}


function formSubmitHandler (evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    closePopup()
}


editButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler)



