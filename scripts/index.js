let editButton = document.querySelector('.profile__rectangle-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_field_name');
let jobInput = formElement.querySelector('.popup__input_field_info');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let elementsElement = document.querySelector('.element');
let likeButton = document.querySelector('.element__like');




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


// 1 ПОПАП

function openPopup(event) {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

function closePopup(event) {
    popup.classList.remove('popup_opened');
};


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
};


editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


// 2 ПОПАП


let addButton = document.querySelector('.profile__add-button');


const popupCards = document.querySelector('.popup_type_cards');
let popupCardsCloseButton = document.querySelector('.popup__close_type_cards');



const itemTemplate = document.querySelector('.item_template').content;
const list = document.querySelector('.elements__list');
const cardsFormButton = document.querySelector('.popup__submit-button_type_cards');
let formInputName = document.querySelector('.popup__input_card_name');
let formInputLink = document.querySelector('.popup__input_card_link');
let popupCardsForm = document.querySelector('.popup__form_type_cards');



function openPopupCards(event) {
    popupCards.classList.add('popup_opened');
};

function closePopupCards(event) {
    popupCards.classList.remove('popup_opened');
};

addButton.addEventListener('click', openPopupCards);
popupCardsCloseButton.addEventListener('click', closePopupCards);


// ЗАГРУЗКА КАРТ НА СТРАНИЦУ ПРИ ОТКРЫТИИ 
// Добавление 6 карточек из массива
function renderItems() {
    initialCards.forEach(renderItem);
};

function renderItem(element) {
    const htmlElement = itemTemplate.cloneNode(true);
    htmlElement.querySelector('.element__text').textContent = element.name;
    htmlElement.querySelector('.element__photo').src = element.link;
    // Добавляем лайки
    htmlElement.querySelector('.element__like').addEventListener('click', function (event) {
        event.target.classList.toggle('element__like_active');
    });

    htmlElement.querySelector('.element__photo').addEventListener('click', function (event) {
        popupPicture.classList.add('popup_opened');
        popupPictureImage.src = event.target.src;        
        popupPictureTitle.textContent = element.name;
    });

    // Обработчик для удаления карточек
    setEventListeners(htmlElement);
    // Добавление элементов в конец
    list.prepend(htmlElement);
};


// Отправка формы
function handleSubmit(evt) {
    evt.preventDefault();
    renderItem({name: formInputName.value, link: formInputLink.value});
    closePopupCards();
};

popupCardsForm.addEventListener('submit', handleSubmit);
renderItems();



// 3 ПОПАП

const popupPicture = document.querySelector('.popup_type_picture');
let popupPictureCloseButton = document.querySelector('.popup__close_type_picture');
let popupPictureImage = document.querySelector('.popup__image');
let popupPictureTitle = document.querySelector('.popup__title_type_picture');
let elementsText = document.querySelector('.element__text');


function closePopupPicture(event) {
    popupPicture.classList.remove('popup_opened');
};

popupPictureCloseButton.addEventListener('click', closePopupPicture);


// Кнопка Удаления

function handleDelete(evt) {
    evt.target.closest('.element').remove();
};

function setEventListeners(htmlElement) {
    const deleteButton = htmlElement.querySelector('.element__delete-card');
    deleteButton.addEventListener('click', handleDelete);
};




























// let editButton = document.querySelector('.profile__rectangle-button');
// const popup = document.querySelector('.popup');
// const popupCloseButton = document.querySelector('.popup__close');
// let formElement = document.querySelector('.popup__form');
// let nameInput = formElement.querySelector('.popup__input_field_name');
// let jobInput = formElement.querySelector('.popup__input_field_info');
// let popupSubmitButton = document.querySelector('.popup__submit-button');
// let profileTitle = document.querySelector('.profile__title');
// let profileSubtitle = document.querySelector('.profile__subtitle');
// let elementsElement = document.querySelector('.element');
// let likeButton = document.querySelector('.element__like');




// const initialCards = [
//     {
//         name: 'Архыз',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//         name: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         name: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         name: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         name: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         name: 'Байкал',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ];


// // 1 ПОПАП

// function openPopup(event) {
//     popup.classList.add('popup_opened');
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileSubtitle.textContent;
// };

// function closePopup(event) {
//     popup.classList.remove('popup_opened');
// };


// function formSubmitHandler(evt) {
//     evt.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;
//     closePopup();
// };


// editButton.addEventListener('click', openPopup);
// popupCloseButton.addEventListener('click', closePopup);
// formElement.addEventListener('submit', formSubmitHandler);


// // 2 ПОПАП


// let addButton = document.querySelector('.profile__add-button');
// const popupCards = document.querySelector('.popup-cards_adjust_item');
// let popupCardsCloseButton = document.querySelector('.popup-cards__close');



// const itemTemplate = document.querySelector('.item_template').content;
// const list = document.querySelector('.elements__list');
// const cardsFormButton = document.querySelector('.popup-cards__submit-button');
// let formInputName = document.querySelector('.popup-cards__input_field_name');
// let formInputLink = document.querySelector('.popup-cards__input_field_info');
// let popupCardsForm = document.querySelector('.popup-cards__form');







// function openPopupCards(event) {
//     popupCards.classList.add('popup-cards_opened');
// };

// function closePopupCards(event) {
//     popupCards.classList.remove('popup-cards_opened');
// };

// addButton.addEventListener('click', openPopupCards);
// popupCardsCloseButton.addEventListener('click', closePopupCards);


// // ЗАГРУЗКА КАРТ НА СТРАНИЦУ ПРИ ОТКРЫТИИ 
// // Добавление 6 карточек из массива
// function renderItems() {
//     initialCards.forEach(renderItem);
// };

// function renderItem(element) {
//     const htmlElement = itemTemplate.cloneNode(true);
//     htmlElement.querySelector('.element__text').textContent = element.name;
//     htmlElement.querySelector('.element__photo').src = element.link;
//     // Добавляем лайки
//     htmlElement.querySelector('.element__like').addEventListener('click', function (event) {
//         event.target.classList.toggle('element__like_active');
//     });

//     htmlElement.querySelector('.element__photo').addEventListener('click', function (event) {
//         popupPicture.classList.add('popup-picture_opened');
//         popupPictureImage.src = event.target.src;        
//         popupPictureTitle.textContent = element.name;
//     });

//     // Обработчик для удаления карточек
//     setEventListeners(htmlElement);
//     // Добавление элементов в конец
//     list.prepend(htmlElement);
// };


// // Отправка формы
// function handleSubmit(evt) {
//     evt.preventDefault();
//     renderItem({name: formInputName.value, link: formInputLink.value});
//     closePopupCards();
// };

// popupCardsForm.addEventListener('submit', handleSubmit);
// renderItems();



// // 3 ПОПАП

// const popupPicture = document.querySelector('.popup-picture_adjust_item');
// let popupPictureCloseButton = document.querySelector('.popup-picture__close');
// let popupPictureImage = document.querySelector('.popup-picture__image');
// let popupPictureTitle = document.querySelector('.popup-picture__title');
// let elementsText = document.querySelector('.element__text');


// function closePopupPicture(event) {
//     popupPicture.classList.remove('popup-picture_opened');
// };

// popupPictureCloseButton.addEventListener('click', closePopupPicture);


// // Кнопка Удаления

// function handleDelete(evt) {
//     evt.target.closest('.element').remove();
// };

// function setEventListeners(htmlElement) {
//     const deleteButton = htmlElement.querySelector('.element__delete-card');
//     deleteButton.addEventListener('click', handleDelete);
// };
