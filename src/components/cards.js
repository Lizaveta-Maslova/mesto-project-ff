// Массив исходных карточек
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки
export const createCard = function (
  card,
  handleDelete,
  handleLike,
  openPreviewPopup
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Наполняем содержимым
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // Обработчик для удаления карточки
  deleteButton.addEventListener("click", function () {
    handleDelete(cardElement);
  });

  // Обработчик для лайка
  likeButton.addEventListener("click", function () {
    handleLike(likeButton);
  });

  // Обработчик для открытия попапа с изображением
  cardImage.addEventListener("click", function () {
    openPreviewPopup(card.name, card.link);
  });

  return cardElement; // возвращаем карточку
};

// Функция - обработчик лайка
export const handleLike = function (likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
};

// Функция удаления карточки
export const removeCard = function (cardElement) {
  cardElement.remove();
};

//функция для того, чтобы происходило закрытие попапов при нажатии на оверлей
export function closeOverleyClick(event) {
  // Находим  (попап) элемента, по которому был клик
  const popup = event.currentTarget.closest(".popup");
  // Проверяем, был ли клик по фону попапа
  if (event.target === popup) {
    closePopup();
  }
}