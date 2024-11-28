import "./pages/index.css"; // добавьте импорт главного файла стилей

import {
  createCard,
  handleLike,
  removeCard,
  closeOverleyClick,
} from "./components/cards.js";
import { openPreviewPopup, openPopup, closePopup } from "./components/modal.js";
import { initialCards } from "./components/cards.js";

const placesList = document.querySelector(".places__list");
const cards = document.querySelectorAll(".card"); //создаю пустой массив для карточек

// Обработчик для попапа
const previewPopup = document.querySelector(".popup_type_image");
const previewPopupImage = previewPopup.querySelector(".popup__image");
const previewPopupCaption = previewPopup.querySelector(".popup__caption");

const renderCards = function (cardElements, handleDelete) {
  cardElements.forEach(function (card) {
    const cardElement = createCard(
      card,
      handleDelete,
      handleLike,
      openPreviewPopup
    );
    placesList.append(cardElement);
  });
};

// Рендерим карточки
renderCards(initialCards, removeCard);

let editButton = document.querySelector(".profile__edit-button");
let newCardButton = document.querySelector(".profile__add-button");
let closeButtons = document.querySelectorAll(".popup__close"); // кнопка закрытия

editButton.addEventListener("click", function () {
  openPopup(".popup_type_edit"); // попап редактирования профиля
});

newCardButton.addEventListener("click", function () {
  openPopup(".popup_type_new-card"); // попап добавления новой карточки
});

// Функция для открытия попапа с изображением
export const openImagePopup = function (link, name) {
  const image = document.querySelector(".popup__image");
  const caption = document.querySelector(".popup__caption");

  image.src = link;
  image.alt = name;
  caption.textContent = name;

  // Открываем попап с изображением
  openPopup(".popup__image");
};

// Вешаю бработчик на клик по каждой кнопке закрытия
for (let i = 0; i < closeButtons.length; i++) {
  let closeButton = closeButtons[i]; // Получаю текущую кнопку закрытия
  closeButton.addEventListener("click", function () {
    closePopup(); // Закрываю все открытые попапы
  });
}

// Обработчик события нажатия клавиш
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    // Проверяю, была ли нажата клавиша Esc
    closePopup(); // Закрываю все открытые попапы
  }
});

// Вешаем обработчик на клик по каждому попапу
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closeOverleyClick);
});

// Нахожу форму в DOM
const formElement = document.forms["edit-profile"];
// Нахожу поля формы в DOM
// const nameInput = formElement.elements.name; // Исправлено: используем formElement
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description"); // Исправлено: используем formElement

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  // О том, как это делать, расскажем позже.

  // Получаю значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Выбираю элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector(".profile__title"); // селектор для элемента имени профиля
  const profileJob = document.querySelector(".profile__description"); // селектор для элемента описания профиля

  // Вставляю новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
}

// Прикрепляю обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
// // ---------------------------------------------------------
// // 2 форма

// Нахожу форму в DOM
const placeElement = document.forms["new-place"];
// Находим поля формы в DOM
const urlInput = document.querySelector(".popup__input_type_url"); // ссылка на картинку
const placeInput = document.querySelector(".popup__input_type_card-name"); // название места

function placeFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    link: urlInput.value,
    name: placeInput.value,
  };
  const cardPlace = createCard(newCard, handleLike, openPreviewPopup);
  placesList.prepend(cardPlace);
  popUpAddForm.reset();
  closePopup();
}

placeElement.addEventListener("submit", placeFormSubmit);
