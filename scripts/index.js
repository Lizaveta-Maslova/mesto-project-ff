const handleCardDelete = (cardElement) => {
  cardElement.remove();
};

const createCard = (cardData, handleDelete) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => handleDelete(cardElement));

  return cardElement;
};

const renderCards = (cardElements, handleDelete) => {
  const placesList = document.querySelector(".places__list");

  cardElements.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDelete);
    placesList.append(cardElement);
  });
};

renderCards(initialCards, handleCardDelete);
