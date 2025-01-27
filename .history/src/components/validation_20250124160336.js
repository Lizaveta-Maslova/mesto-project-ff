const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  };
  
  const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove('popup__input_type_error');
    // Скрываем сообщение об ошибке
    errorElement.classList.remove('popup__error_visible');
    // Очистим ошибку
    ormError.textContent = '';
  };

// Функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку - 1 параметр
      // Передадим сообщение об ошибке вторым аргументом
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement);
    }
  }; 
