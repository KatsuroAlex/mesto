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

// 1 ПОПАП

function openPopup(event) {
    popup.classList.add('popup_opened')
    nameInput.value = profileTitle.textContent
    jobInput.value = profileSubtitle.textContent
}

function closePopup(event) {
    popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    closePopup()
}
editButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler)


// 2 попап

















// ЗАГРУЗКА КАРТ НА СТРАНИЦУ

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

// получаем UL
const list = document.querySelector('.elements__list')
// получаем фрагмент
const itemTemplate = document.querySelector('.item_template').content

const renderItems = (element, index) => {
    initialCards.forEach(renderItem);
}

const renderItem = (element) => {
    const htmlElement = itemTemplate.cloneNode(true);
    htmlElement.querySelector('.elements__text').textContent = element.name;
    htmlElement.querySelector('.elements__photo').src = element.link;
    list.append(htmlElement);
}

renderItems()






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