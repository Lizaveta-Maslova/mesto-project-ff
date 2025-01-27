import "./pages/index.css"; // добавьте импорт главного файла стилей
import { createCard, handleLike, removeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlayClick,
} from "./components/modal.js";
import { initialCards } from "./components/cards.js";


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
const profileJob = document.querySelector(".profile__description"); // селектор для элемента описания профил

// Нахожу 1 форму в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupList = document.querySelectorAll(".popup");

const renderCards = function (cardDataList, removeCard) {
  cardDataList.forEach(function (card) {
    const cardElement = createCard(
      card,
      removeCard,
      handleLike,
      openPreviewPopup
    );
    placesList.append(cardElement);
  });
};

// Рендерим карточки
renderCards(initialCards, removeCard);

// Функция открытия превью
function openPreviewPopup(name, link) {
  previewPopupImage.src = link;
  previewPopupImage.alt = name;
  previewPopupCaption.textContent = name;

  openPopup(previewPopup);
}

function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    link: urlInput.value,
    name: placeInput.value,
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
}

// Обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  // О том, как это делать, расскажем позже.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupEdit);
}

editButton.addEventListener("click", function () {
  openPopup(popupEdit); // попап редактирования профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

newCardButton.addEventListener("click", function () {
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


// //3 функции валидации
// import { 
//   enableValidation, 
//   validationConfig, 
//   clearValidation, 
// } from "./components/validation.js"; 

// 6 переменных для запросов на сервер
import { 
  getUserInfo, 
  getInitialCards, 
  handleResponse, 
  editProfileInfo, 
  addNewCard, 
  changeUserAvatar, 
} from "./components/api.js"; 
 

const popupTypeAvatar = document.querySelector(".popup_type_avatar"); //всплывающий попап аватара профиля
console.log(popupTypeAvatar)
const formAvatar = document.forms["avatar"]; //находим форму по имени avatar
const linkInputAvatar = formAvatar.elements["avatar-link"]; //поле ввода для ссылки на новый аватар

//получение данных с сервера
//ждём, пока все запросы - о карточках, об информации о пользователе завершатся
Promise.all([getInitialCards(), getUserInfo()]) 
  .then(([dataCards, dataProfile]) => { 
    handleProfileFormSubmit(dataProfile); //отображаем данные профиля
    handleInfoCards(dataCards, dataProfile._id); //отображаем карточки на странице
  }) 
  .catch((err) => { 
    console.log(`Что-то пошло не так. Ошибка: ${err}`); 
  }); 
 
function renderLoading(button, isLoading) { 
  if (isLoading) { 
    button.textContent = "Сохранение..."; 
    button.disabled = true; 
  } else { 
    button.textContent = "Сохранить"; 
    button.disabled = false; 
  } 
} 
 
function handleProfileFormSubmit(res) { 
  profileInfo.dataset.userId = res._id; 
  profileImage.style.backgroundImage = `url(${res.avatar})`; 
  profileTitle.textContent = res.name; 
  profileDescription.textContent = res.about; 
} 
 
function handleInfoCards(res, ownerId) { 
  res.forEach((card) => { 
    cardsContainer.append( 
      createCard({ card: card, handleImagePopup, likeCard }, ownerId) 
    ); 
  }); 
} 
 
function handleFormSubmitProfile(evt) { 
  evt.preventDefault(); 
 
  const saveButtonProfile = formEditProfile.querySelector(".button"); 
  renderLoading(saveButtonProfile, true); 
  editProfileInfo(nameProfileInput.value, jobProfileInput.value) 
    .then((res) => { 
      handleProfileFormSubmit(res); 
      closePopUp(popUpEdit); 
    }) 
    .catch((err) => { 
      console.log(`Что-то пошло не так. Ошибка: ${err}`); 
    }) 
    .finally(() => { 
      renderLoading(saveButtonProfile, false); 
    }); 
} 
 
formEditProfile.addEventListener("submit", handleFormSubmitProfile); 
 
function handleFormAddNewCardSubmit(evt) { 
  evt.preventDefault(); 
 
  const saveButtonNewCard = formNewCard.querySelector(".button"); 
  renderLoading(saveButtonNewCard, true); 
  addNewCard(nameCardInput.value, linkCardInput.value) 
    .then((card) => { 
      cardsContainer.prepend( 
        createCard( 
          { card: card, handleImagePopup, likeCard }, 
          profileInfo.dataset.userId 
        ) 
      ); 
      formNewCard.reset(); 
      closePopUp(popUpAdd); 
    }) 
    .catch((err) => { 
      console.log(`Что-то пошло не так. Ошибка: ${err}`); 
    }) 
    .finally(() => { 
      renderLoading(saveButtonNewCard, false); 
    }); 
} 
formNewCard.addEventListener("submit", handleFormAddNewCardSubmit); 
 
function handleFormSubmitAvatar(evt) { 
  evt.preventDefault(); 
 
  const saveButtonAvatar = formAvatar.querySelector(".button"); 
  renderLoading(saveButtonAvatar, true); 
  changeUserAvatar(linkInputAvatar.value) 
    .then((res) => { 
      handleProfileFormSubmit(res); 
      closePopUp(popupTypeAvatar); 
    }) 
    .catch((err) => { 
      console.log(`Что-то пошло не так. Ошибка: ${err}`); 
    }) 
    .finally(() => { 
      renderLoading(saveButtonAvatar, false); 
    }); 
} 
formAvatar.addEventListener("submit", handleFormSubmitAvatar); 
 
profileImage.addEventListener("click", () => { 
  openPopUp(popupTypeAvatar); 
  clearValidation(formAvatar, validationConfig); 
}); 
 
buttonEdit.addEventListener("click", () => { 
  openPopUp(popUpEdit); 
  handleFormEditProfile(); 
  clearValidation(formEditProfile, validationConfig); 
}); 
 
buttonAdd.addEventListener("click", () => { 
  openPopUp(popUpAdd); 
  clearValidation(formNewCard, validationConfig); 
}); 
 
 
profileImage.addEventListener("click", () => { 
  openPopUp(popupTypeAvatar); 
  clearValidation(formAvatar, validationConfig); 
}); 
 

enableValidation(validationConfig); 
