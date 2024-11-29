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

// Функция удаления карточки
export const handleDelete = function (cardElement) {
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.remove();
};
