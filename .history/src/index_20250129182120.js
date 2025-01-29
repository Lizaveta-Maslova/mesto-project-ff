import "./pages/index.css"; // добавьте импорт главного файла стилей
import { createCard, handleLike, removeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlayClick,
} from "./components/modal.js";
// import { initialCards } from "./components/cards.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {getUserInfo, getInitialCards, updateUserInfo, addNewCard} from './components/api.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const placesList = document.querySelector(".places__list");
// Обработчик для попапа
const previewPopup = document.querySelector(".popup_type_image");
const previewPopupImage = previewPopup.querySelector(".popup__image");
const previewPopupCaption = previewPopup.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

// Нахожу форму в DOM
const editFormElement = document.forms["edit-profile"];

// Нахожу 2 форму в DOM
const formAddPlace = document.forms["new-place"];
// Находим поля формы в DOM
const urlInput = document.querySelector(".popup__input_type_url"); // ссылка на картинку
const placeInput = document.querySelector(".popup__input_type_card-name"); // название места

// Выбираю элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title"); // селектор для элемента имени профиля
const profileJob = document.querySelector(".profile__description"); // селектор для элемента описания профиля
const profileImage = document.querySelector('.profile__image'); //аватар пользователя

// Нахожу 1 форму в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
// const popupAvatar = document.querySelector('.popup_type_avatar')

const popupList = document.querySelectorAll(".popup");

let myId = ''; //


 getInitialCards().then(cards => {
  cards.forEach(card => {
    const cardElement = createCard(card, removeCard, handleLike, openPreviewPopup)
    placesList.append(cardElement )
  })
  });
  
// const renderCards = function (cardDataList, removeCard) {
//   cardDataList.forEach(function (card) {
//     const cardElement = createCard(
//       card,
//       removeCard,
//       handleLike,
//       openPreviewPopup
//     );
//     placesList.append(cardElement);
//   });
// };

// Рендерим карточки
// renderCards(initialCards, removeCard);

// Функция открытия превью
function openPreviewPopup(name, link) {
  previewPopupImage.src = link;
  previewPopupImage.alt = name;
  previewPopupCaption.textContent = name;

  openPopup(previewPopup);
}

function handlePlaceAddFormSubmit(evt) { 
  evt.preventDefault(); 
  addNewCard(placeInput.value, urlInput.value).then(cardData => {
    const newCard = { 
      link: cardData.link, 
      name: cardData.name, 
    }; 
    const cardPlace = createCard( 
      newCard, 
      removeCard, 
      handleLike, 
      openPreviewPopup 
    ); 
    placesList.prepend(cardPlace); 
   
    formAddPlace.reset(); 
   
    closePopup(popupNewCard); 
  })
  
} 

// Обработчик «отправки» формы-1
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  // О том, как это делать, расскажем позже.
  updateUserInfo(nameInput.value, jobInput.value).then(card => {
  const nameValue = card.name;
  const jobValue = card.about;
  // const nameValue = nameInput.value;
  // const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupEdit);
})};

editButton.addEventListener("click", function () {
  clearValidation(editFormElement, validationConfig);
  openPopup(popupEdit); // попап редактирования профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

newCardButton.addEventListener("click", function () {
  clearValidation(formAddPlace, validationConfig);
  openPopup(popupNewCard); // попап добавления новой карточки
});

for (let i = 0; i < closeButtons.length; i++) {
  let closeButton = closeButtons[i];
  // Находим попап, к которому относится крестик
  const popup = closeButton.closest(".popup");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
}

// Вешаем обработчик на клик по каждому попапу
popupList.forEach((popup) => {
  popup.addEventListener("click", closeOverlayClick);
});

// Прикрепляю обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener("submit", handleEditProfileFormSubmit);

formAddPlace.addEventListener("submit", handlePlaceAddFormSubmit);

enableValidation(validationConfig)

//аватар, текстовые поля-имя, занятие - 1 функция
getUserInfo().then(card => {
  profileName.textContent = card.name;
  profileJob.textContent = card.about;
  profileImage.style.backgroundImage = `url(${card.avatar}`;
})

getUserInfo().then(data => console.log(data))

