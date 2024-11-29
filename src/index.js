import "./pages/index.css"; // добавьте импорт главного файла стилей
import {
  createCard,
  handleDelete,
  handleLike,
  removeCard,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlayClick,
  handleCloseModalByEsc,
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
const editformElement = document.forms["edit-profile"];
// Нахожу 1 форму в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Нахожу 2 форму в DOM
const formAddPlace = document.forms["new-place"];
// Находим поля формы в DOM
const urlInput = document.querySelector(".popup__input_type_url"); // ссылка на картинку
const placeInput = document.querySelector(".popup__input_type_card-name"); // название места

// Выбираю элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title"); // селектор для элемента имени профиля
const profileJob = document.querySelector(".profile__description"); // селектор для элемента описания профиля

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const renderCards = function (cardDataList, handleDelete) {
  cardDataList.forEach(function (card) {
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

// Функция открытия превью
function openPreviewPopup(name, link) {
  previewPopupImage.src = link;
  previewPopupImage.alt = name;
  previewPopupCaption.textContent = name;

  openPopup(previewPopup);
}

// Функция для открытия попапа с изображением
export const openImagePopup = function (link, name) {
  const image = document.querySelector(".popup__image");
  const caption = document.querySelector(".popup__caption");

  image.src = link;
  image.alt = name;
  caption.textContent = name;

  // Открываем попап с изображением
  openPopup(previewPopupImage);
};

// Обработчик «отправки» формы
function ediitHandleFormSubmit(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  // О том, как это делать, расскажем позже.

  // Получаю значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставляю новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  editformElement.reset();
  closePopup(popupEdit);
}

function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    link: urlInput.value,
    name: placeInput.value,
  };
  const cardPlace = createCard(
    newCard,
    handleDelete,
    handleLike,
    openPreviewPopup
  );
  placesList.prepend(cardPlace);
  formAddPlace.reset();
  closePopup(popupNewCard);
}

editButton.addEventListener("click", function () {
  openPopup(popupEdit); // попап редактирования профиля
});

newCardButton.addEventListener("click", function () {
  openPopup(popupNewCard); // попап добавления новой карточки
});

// Вешаю бработчик на клик по каждой кнопке закрытия
for (let i = 0; i < closeButtons.length; i++) {
  let closeButton = closeButtons[i]; // Получаю текущую кнопку закрытия
  closeButton.addEventListener("click", function () {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup); // Закрываю все открытые попапы
  });
}

// Обработчик события нажатия клавиш
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    // Проверяю, была ли нажата клавиша Esc
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup); // Закрываю все открытые попапы
  }
});

// Вешаем обработчик на клик по каждому попапу
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closeOverlayClick);
});

// Прикрепляю обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editformElement.addEventListener("submit", ediitHandleFormSubmit);

formAddPlace.addEventListener("submit", handlePlaceAddFormSubmit);
