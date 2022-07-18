const popups = document.querySelectorAll('.popup');


const popupContainer = document.querySelector('.popup__container');

const popupCloseButton = document.querySelectorAll('.popup__close');

const form = document.querySelector('.popup__form');
const nameInput = form.querySelector('.popup__input_field_name');
const jobInput = form.querySelector('.popup__input_field_info');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardElement = document.querySelector('.element');
const buttonLike = document.querySelector('.element__like');
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

const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const popupPicture = document.querySelector('.popup_type_picture');

const buttonEditProfile = document.querySelector('.profile__rectangle-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const buttonsClose = document.querySelectorAll('.popup__close');


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

buttonsClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupProfile);
});

// Закрытие попапа на кнопку ESC
function closePopupEsc (evt) {
    if(evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
        document.removeEventListener('keydown', closePopupEsc);
    };
};

// ЗАКРЫТИЕ ПОПАПОВ НА ОВЕРЛЕЙ
popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if(event.target === event.currentTarget) {
            closePopup(popup);
        };
    });
});

// ОТПРАВКА ФОРМЫ popupProfile
function handleSubmitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
};

// Отправка формы popupCards
function handleSubmitPopupCardsForm(evt) {
    evt.preventDefault();
    renderCard({ name: formInputName.value, link: formInputLink.value });
    closePopup(popupCards);
};

buttonAddCard.addEventListener('click', () => { openPopup(popupCards) });
popupCardsForm.addEventListener('submit', handleSubmitPopupCardsForm);
form.addEventListener('submit', handleSubmitProfileForm);

// ЗАГРУЗКА КАРТ НА СТРАНИЦУ ПРИ ОТКРЫТИИ 
function createCard(element) {
    const cardElement = itemTemplate.cloneNode(true);
    const cardElementPhoto = cardElement.querySelector('.element__photo');
    cardElement.querySelector('.element__text').textContent = element.name;
    cardElementPhoto.src = element.link;
    cardElementPhoto.alt = element.name;
    // Добавляем лайки
    cardElement.querySelector('.element__like').addEventListener('click', toggleLike);
    cardElementPhoto.addEventListener('click', function (event) {
        openPopup(popupPicture);
        popupPictureImage.src = event.target.src;
        popupPictureTitle.textContent = element.name;
    });
    // Обработчик для удаления карточек
    const buttonDeleteCard = cardElement.querySelector('.element__delete-card');
    buttonDeleteCard.addEventListener('click', handleDelete);
    return cardElement;
};

function toggleLike(event) {
    event.target.classList.toggle('element__like_active');
};

function renderCard(cardElement) {
    list.prepend(createCard(cardElement));
}

// Добавление 6 карточек из массива
function renderItems() {
    initialCards.forEach(renderCard);
};

renderItems();

// Кнопка удаления карточки
function handleDelete(evt) {
    evt.target.closest('.element').remove();
};





