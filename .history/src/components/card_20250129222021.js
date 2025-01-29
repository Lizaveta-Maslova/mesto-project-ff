import {deleteCard} from './'

// Функция создания карточки
export const createCard = function (
  card,
  removeCard,
  handleLike,
  openPreviewPopup,
  userId,
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector('.card__like-number');

  // Проверяем, кто создал карточку
  if (userId !== card.owner._id) {
    // Если карточка создана текущим пользователем, показываем кнопку удаления
    deleteButton.style.display = 'none';
  }

  // Наполняем содержимым
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeButton.textContent = card.likes.length;

  //Обработчик для кнопки удаления
  deleteButton.addEventListener("click", function () {
    removeCard(cardElement);
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
export const removeCard = function (cardElement, id) {
  deleteCard(id).then(card => {
    cardElement.remove();
  })
};
