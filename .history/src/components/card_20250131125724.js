import {deleteCard,  likeCard, unLikeCard} from './api'

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
  const cardLikeNumber = cardElement.querySelector('.card__like-number');

  // Проверяем, кто создал карточку
  if (userId !== card.owner._id) {
    // Если карточка создана текущим пользователем, показываем кнопку удаления
    deleteButton.style.display = 'none';
  }

  // Наполняем содержимым
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  // cardLikeNumber.textContent = card.likes.length;

  //Обработчик для кнопки удаления
  deleteButton.addEventListener("click", function () {
    removeCard(cardElement, card._id); //добавила id карточке, чтобы сервер знал, что именно нужно удалить с сервера.
  });

  // Обработчик для лайка
  likeButton.addEventListener("click", function () {
    handleLike(likeButton, cardLikeNumber, card.id);
  });

  cardLikeNumber.textContent = 
    cardard.likes.length === 0 ? "0" : card.likes.length; 
  if ( 
    card.likes.some((card) => { 
      return card._id === ownerId; 
    }) 
  ) { 
    likeButton.classList.add("card__like-button_is-active"); 
  } 
  // Обработчик для открытия попапа с изображением
  cardImage.addEventListener("click", function () {
    openPreviewPopup(card.name, card.link);
  });

  return cardElement; // возвращаем карточку
};

// Функция - обработчик лайка
export const handleLike = function (likeButton, id, cardLikeNumber) {
  const isLiked =likeButton.contains(card__like-button_is-active);
  likeCard(id,isLiked).then(card => {
    likeButton.classList.toggle("card__like-button_is-active");
    cardLikeButton.textContent = card.likes.length;
  })
  
};

// Функция удаления карточки
export const removeCard = function (cardElement, id) {
  deleteCard(id).then(() => {
    cardElement.remove();
  })
  .catch((err) => { 
    console.log(`Что-то пошло не так. Ошибка: ${err}`); 
  })
};
