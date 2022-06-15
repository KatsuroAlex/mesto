const profileRectangleButton = document.querySelector('.profile__rectangle-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
let popupContainer = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__info');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');





profileRectangleButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);




// ОТКРЫТЬ ЗАКРЫТЬ ПОПАП
function openPopup(event) {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup(event) {
    popup.classList.remove('popup_opened');
}



// Закрыть ПОПАП на экран и крестик
popup.addEventListener('click', (event) => {
    if(!event.defaultPrevented) {
        closePopup();
    }
})

popupContainer.addEventListener('click', (event) => {
    event.preventDefault();
})


function formSubmitHandler (event) {
    event.preventDefault();
    profileTitle.textContent = `${nameInput.value}`;
    profileSubtitle.textContent = `${jobInput.value}`;
    closePopup();

}





formElement.addEventListener('submit', formSubmitHandler);