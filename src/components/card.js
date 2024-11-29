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
  const likeButton = cardElement.querySelector(".card__like-button");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Наполняем содержимым
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener("click", function () {
    handleDelete(cardElement);
  });

  // Обработчик для лайка
  likeButton.addEventListener("click", function () {
    handleLike(likeButton);
  });

  // // Обработчик для удаления карточки
  // deleteButton.addEventListener("click", function () {
  //   handleDelete(cardElement);
  // });

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
