const showInputError = (element) => {
    element.classList.add('popup__input_type_error');
    // Показываем сообщение об ошибке
    formError.classList.add('form__input-error_active');
  };
  
  const hideInputError = (element) => {
    element.classList.remove('form__input_type_error');
    // Скрываем сообщение об ошибке
    formError.classList.remove('form__input-error_active');
  };

  // Функция, которая проверяет валидность поля
  const isValid = () => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formInput);
    } else {
      // Если проходит, скроем
      hideInputError(formInput);
    }
  };

