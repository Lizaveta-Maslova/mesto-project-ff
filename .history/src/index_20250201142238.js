import "./pages/index.css"; // добавьте импорт главного файла стилей
import { createCard, handleLike, removeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlayClick,
} from "./components/modal.js";
// import { initialCards } from "./components/cards.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar} from './components/api.js';

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

//Нахожу 3 форму
const updateAvatarForm = document.forms["avatar"];
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

const popupList = document.querySelectorAll(".popup");
// const saveButton = document.querySelectorAll(".save_button");

let myId = ''; //наш айди
// let userId = '';

const avatarButton = document.querySelector('.button_update_avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarInputLink = document.querySelector('.popup__input_type_avatar_link')


//аватар, текстовые поля-имя, занятие - 1 функция
// getUserInfo(avatarInputLink).then(card => {
//   profileName.textContent = card.name;
//   profileJob.textContent = card.about;
//   profileImage.style.backgroundImage = `url(${card.avatar}`;
//   myId = card._id;
// })


// getUserInfo().then(data => console.log(data))
//  getInitialCards().then(cards => {
//   cards.forEach(card => {
//     const cardElement = createCard(card, removeCard, handleLike, openPreviewPopup, myId);
//     placesList.append(cardElement);
//   })
//   })

Promise.all([getUserInfo(), getInitialCards()]).then(([userInfo, cards]) => {
  profileName.textContent = userInfo.name;
  profileJob.textContent = card.about;
  profileImage.style.backgroundImage = `url(${card.avatar}`;
  myId = card._id;
  cards.forEach(card => {
      const cardElement = createCard(card, removeCard, handleLike, openPreviewPopup, myId);
       placesList.append(cardElement);
     })
})
  .catch((err) => { 
    console.log(`Что-то пошло не так. Ошибка: ${err}`); 
  })
  
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

function renderLoading(saveButton, isLoading) { 
  if (isLoading) { 
    saveButton.textContent = "Сохранение..."; 
    saveButton.disabled = true; 
  } else { 
    saveButton.textContent = "Сохранить"; 
    saveButton.disabled = false; 
  } 
}

// Обработчик «отправки» формы-1
function handlePlaceAddFormSubmit(evt) { 
  evt.preventDefault();
  const saveButton = formAddPlace.querySelector('.save_button');
  saveButton.textContent = 'Сохранение...';
  renderLoading(saveButton, true); 
  addNewCard(placeInput.value, urlInput.value).then(cardData => {
    // const newCard = { 
    //   link: cardData.link, 
    //   name: cardData.name, 
    // }; 
    const cardPlace = createCard( 
      cardData, 
      removeCard, 
      handleLike, 
      openPreviewPopup, 
      myId
    ); 
    placesList.prepend(cardPlace); 
    formAddPlace.reset(); 
    closePopup(popupNewCard); 
  })
  .catch((err) => { 
    console.log(`Что-то пошло не так. Ошибка: ${err}`); 
  })
    .finally(() => { 
    renderLoading(saveButton, false); 
  });
} 
// Обработчик «отправки» формы-2
function handleUpdateAvatarFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = updateAvatarForm.querySelector('.save_button');
  saveButton.textContent = 'Сохранение...';
  renderLoading(saveButton, true);
  updateAvatar(avatarInputLink.value).then(card => {
    profileImage.style.backgroundImage = `url(${card.avatar}`;
    updateAvatarForm.reset(); 
    closePopup(popupAvatar); 
  })
    .catch((err) => { 
    console.log(`Что-то пошло не так. Ошибка: ${err}`); 
  })
    .finally(() => { 
    renderLoading(saveButton, false); 
    // saveButton.textContent = 'Сохранить'
  });
  }

// Обработчик «отправки» формы-3
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  const saveButton = editFormElement.querySelector('.save_button');
  saveButton.textContent = 'Сохранение...';
  renderLoading(saveButton, true);
  // О том, как это делать, расскажем позже.
  updateUserInfo(nameInput.value, jobInput.value, avatarInputLink.value).then(card => {
  const nameValue = card.name;
  const jobValue = card.about;
  // const nameValue = nameInput.value;
  // const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupEdit);
})
.catch((err) => { 
  console.log(`Что-то пошло не так. Ошибка: ${err}`); 
})
  .finally(() => { 
  renderLoading(saveButton, false); 
});
};

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

avatarButton.addEventListener("click", function () {
  clearValidation(updateAvatarForm, validationConfig);
  openPopup(popupAvatar); // открытие формы обновления аватарки
})

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

updateAvatarForm.addEventListener("submit", handleUpdateAvatarFormSubmit);

enableValidation(validationConfig);

