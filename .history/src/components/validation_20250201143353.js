const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const  {inputErrorClass, errorClass} = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);

  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const  {inputErrorClass, errorClass} = validationConfig;
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
    console.log(inputElement);
  };

// Функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
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

  // Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    const  {inactiveButtonClass} = validationConfig;
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };

  const setEventListeners = (formElement, validationConfig) => {
    const  {inputSelector, submitButtonSelector} = validationConfig;
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, validationConfig)
        toggleButtonState(inputList, buttonElement, validationConfig);
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
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = validationConfig; 
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 
  const buttonElement = formElement.querySelector(submitButtonSelector); 
  
  inputList.forEach(input => { 
      hideInputError(formElement, input, validationConfig);
      input.setCustomValidity(""); // Удаляем кастомное сообщение об ошибке
  }); 
  const saveButton=formElement.q
  buttonElement.classList.add(saveButton); 
  buttonElement.disabled = true; 
}
