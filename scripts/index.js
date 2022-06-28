let editButton = document.querySelector('.profile__rectangle-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');


let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_field_name');
let jobInput = formElement.querySelector('.popup__input_field_info');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let likeButton = document.querySelector('.elements__like');

// 1 ПОПАП

function openPopup(event) {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup(event) {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);




// 2 ПОПАП

let addButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup-cards_adjust_item');
let popupCardsCloseButton = document.querySelector('.popup-cards__close');

let cardsFormElement = document.querySelector('.popup-cards__form');
let cardsNameInput = formElement.querySelector('.popup-cards__input_field_name');
// let CardsJobInput = formElement.querySelector('.popup-cards__input_field_info');
let elementsText = document.querySelector('.elements__text');
let popupCardsSubmitButton = document.querySelector('.popup-cards__submit-button');



function openPopupCards(event) {
    popupCards.classList.add('popup-cards_opened');
};

function closePopupCards(event) {
    popupCards.classList.remove('popup-cards_opened');
};

// function cardsFormSubmitHandler(evt) {
//     evt.preventDefault();
//     elementsText.textContent = cardsNameInput.value;
//     // profileSubtitle.textContent = jobInput.value;
//     closePopupCards();
// }


addButton.addEventListener('click', openPopupCards);
popupCardsCloseButton.addEventListener('click', closePopupCards);
// cardsFormElement.addEventListener('submit', cardsFormSubmitHandler);


// ЗАГРУЗКА КАРТ НА СТРАНИЦУ ПРИ ОТКРЫТИИ 

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const list = document.querySelector('.elements__list');
const itemTemplate = document.querySelector('.item_template').content;

const renderItems = () => {
    initialCards.forEach(renderItem);
}

const renderItem = (element) => {
    const htmlElement = itemTemplate.cloneNode(true);
    htmlElement.querySelector('.elements__text').textContent = element.name;
    htmlElement.querySelector('.elements__photo').src = element.link;
    list.append(htmlElement);
}


const handleSubmit = () => {
    renderItem(cardsNameInput.value);


}



popupCardsSubmitButton.addEventListener('click', handleSubmit);

renderItems();














// const itemTemplate = document.querySelector('.item_template').content;
// const list = document.querySelector('.elements__list')








// const renderItems = () => {
// 	items.forEach(Item);
// };


// const renderItem = (item) => {
//   const htmlElement = itemTemplate.cloneNode(true);
//   htmlElement.querySelector('.elements__element')
//   list.append(htmlElement)
  

// }









// const renderItem = (text) => {
// 	const htmlElement = itemTemplate.cloneNode(true);
// 	htmlElement.querySelector('.elements__text').textContent = text;
// 	setEventListeners(htmlElement);

// 	list.append(htmlElement)
// }











// const addLike = (event) => {
//     likeButton.classList.toggle('elements__like_active');
// }

// likeButton.addEventListener('click', addLike)