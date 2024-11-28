// Функция открытия превью
export function openPreviewPopup(name, link) {
  previewPopupImage.src = link;
  previewPopupImage.alt = name;
  previewPopupCaption.textContent = name;

  openPopup(".popup_type_image");
}

// Функция открытия попапа
export function openPopup(popupSelector) {
  let popupElement = document.querySelector(popupSelector);
  popupElement.classList.add("popup_is-opened");
  popupElement.classList.add("popup_is-animated");
}

// Функция для закрытия попапа
export function closePopup() {
  // Поиск открытых попапов
  let openPopups = document.querySelectorAll(".popup_is-opened");
  // Перебор открытых попапов с помощью цикла for и удаление класс popup_is_opened
  for (let i = 0; i < openPopups.length; i++) {
    let popup = openPopups[i];
    popup.classList.remove("popup_is-opened");
    popupElement.classList.remove("popup_is-animated");
  }
}
