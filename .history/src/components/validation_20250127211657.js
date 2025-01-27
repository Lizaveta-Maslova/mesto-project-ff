const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
      hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const { inactiveButtonClass } = validationConfig;
  if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector } = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement, validationConfig);
          toggleButtonState(inputList, buttonElement, validationConfig); // Обновляем состояние кнопки
      });
  });
};

  export const enableValidation = (validationConfig) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const  {formSelector} = validationConfig;
    const formList = Array.from(document.querySelectorAll(formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, validationConfig);
    });
  };
  
export const clearValidation = (formElement, validationConfig) => {
    const  {inputSelector, submitButtonSelector, inactiveButtonClass} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach(input => {
        hideInputError(formElement, input, validationConfig)
    })
    buttonElement.classList.add(inactiveButtonClass);
}