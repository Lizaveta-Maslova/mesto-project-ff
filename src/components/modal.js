// Функция открытия попапа
export function openPopup(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseModalByEsc);
}

// Функция для закрытия попапа
export function closePopup(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseModalByEsc);
}

//функция для того, чтобы происходило закрытие попапов при нажатии на оверлей
export function closeOverlayClick(event) {
  // Находим  (попап) элемента, по которому был клик
  const popup = event.currentTarget.closest(".popup");
  // Проверяем, был ли клик по фону попапа
  if (event.target === popup) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export function handleCloseModalByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
