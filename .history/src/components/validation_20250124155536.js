const showInputError = (formElement, inputElement, errorMessage) => {
    element.classList.add('popup__input_type_error');
    // Показываем сообщение об ошибке
    formError.textContent = errorMessage;
    formError.classList.add('popup__error_visible');
  };
  
  const hideInputError = (element) => {
    element.classList.remove('popup__input_type_error');
    // Скрываем сообщение об ошибке
    formError.classList.remove('popup__error_visible');
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
