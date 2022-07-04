const popupCloseButton = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_field_name');
const jobInput = formElement.querySelector('.popup__input_field_info');
const popupSubmitButton = document.querySelector('.popup__submit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardElement = document.querySelector('.element');
const likeButton = document.querySelector('.element__like');
const elementPhoto = document.querySelector('.element__photo');

const popupCardsCloseButton = document.querySelector('.popup__close_type_cards');

const itemTemplate = document.querySelector('.item_template').content;
const list = document.querySelector('.elements__list');
const cardsFormButton = document.querySelector('.popup__submit-button_type_cards');
const formInputName = document.querySelector('.popup__input_card_name');
const formInputLink = document.querySelector('.popup__input_card_link');
const popupCardsForm = document.querySelector('.popup__form_type_cards');

const popupPictureCloseButton = document.querySelector('.popup__close_type_picture');
const popupPictureImage = document.querySelector('.popup__image');
const popupPictureTitle = document.querySelector('.popup__title_type_picture');
const elementText = document.querySelector('.element__text');

let popup = document.querySelectorAll('.popup');
let popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const popupPicture = document.querySelector('.popup_type_picture');

const buttonEditProfile = document.querySelector('.profile__rectangle-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const closeButtons = document.querySelectorAll('.popup__close');

// Массив подклчючен в cards.js 

// 1 ПОПАП

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click',() => closePopup(popup));
});

buttonEditProfile.addEventListener('click', () => {openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
});
buttonAddCard.addEventListener('click', () => {openPopup(popupCards)});


// ОТПРАВКА ФОРМЫ 1 ПОПАП
function handleSubmitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
};
formElement.addEventListener('submit', handleSubmitProfileForm);

// ЗАГРУЗКА КАРТ НА СТРАНИЦУ ПРИ ОТКРЫТИИ 

function renderItem(element) {
    const htmlElement = itemTemplate.cloneNode(true);
    const htmlElementPhoto = htmlElement.querySelector('.element__photo');
    htmlElement.querySelector('.element__text').textContent = element.name;
    htmlElementPhoto.src = element.link;
    htmlElementPhoto.alt = element.name;
    // Добавляем лайки
    htmlElement.querySelector('.element__like').addEventListener('click', function (event) {
        event.target.classList.toggle('element__like_active');
    });
    htmlElementPhoto.addEventListener('click', function (event) {
        openPopup(popupPicture);
        popupPictureImage.src = event.target.src;        
        popupPictureTitle.textContent = element.name;
    });
    // Обработчик для удаления карточек
    const buttonDeleteCard = htmlElement.querySelector('.element__delete-card');
    buttonDeleteCard.addEventListener('click', handleDelete);
    return htmlElement;
};

function renderCard(htmlElement) {
    list.prepend(renderItem(htmlElement));
}

// Добавление 6 карточек из массива
function renderItems() {
    initialCards.forEach(renderCard);
};

renderItems();

// Отправка формы
function handleSubmitPopupCardsForm(evt) {
    evt.preventDefault();
    renderCard({name: formInputName.value, link: formInputLink.value});
    closePopup(popupCards);
};
popupCardsForm.addEventListener('submit', handleSubmitPopupCardsForm);

// Кнопка Удаления
function handleDelete(evt) {
    evt.target.closest('.element').remove();
};