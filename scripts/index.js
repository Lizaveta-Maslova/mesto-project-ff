const renderCards = (cards) => {
  const placesList = document.querySelector(".places__list");

  cards.forEach(({ name, link }) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    deleteButton.addEventListener("click", () => cardElement.remove());

    likeButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_is-active");
    });

    placesList.append(cardElement);
  });
};

renderCards(initialCards);
