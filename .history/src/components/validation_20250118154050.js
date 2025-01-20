// if (validity === false) {
//     resetButton.setAttribute('disabled', true)
//     resetButton.setAttribute('style', 'background-color: #f1f1f1')
//     }

//     function highlightError(field) {
//         field.classList.add("error-highlight");
//     }
    

    // function validateProfileForm(nameField, aboutField) {
    //     let isValid = true;
    //     if (!nameField.value || nameField.value.length < 2 || nameField.value.length > 40) {
    //         showError(nameField, "Имя должно быть от 2 до 40 символов");
    //         isValid = false;
    //     }
    //     if (!aboutField.value || aboutField.value.length < 2 || aboutField.value.length > 200) {
    //         showError(aboutField, "О себе должно быть от 2 до 200 символов");
    //         isValid = false;
    //     }
    //     return isValid;
    // }
   
    // function validatePlaceForm(nameField, imageUrlField) {
    //     let isValid = true;
    //     const namePattern = `/^[a-zA-Zа-яА-ЯёЁ0-9\s\-]+$/`;
    //     if (!nameField.value || nameField.value.length < 2 || nameField.value.length > 30 || !namePattern.test(nameField.value)) {
    //         showError(nameField, "Название должно быть от 2 до 30 символов и содержать только допустимые символы");
    //         isValid = false;
    //     }
        
    //     const urlPattern = `/^(ftp|http|https):\/\/[^ "]+$/`;
    //     if (!imageUrlField.value || !urlPattern.test(imageUrlField.value)) {
    //         showError(imageUrlField, "Ссылка на картинку должна быть корректной");
    //         isValid = false;
    //     }
    //     return isValid;
    // }
    // enableValidation({
    //     formSelector: '.popup__form',
    //     inputSelector: '.popup__input',
    //     submitButtonSelector: '.popup__button',
    //     inactiveButtonClass: 'popup__button_disabled',
    //     inputErrorClass: 'popup__input_type_error',
    //     errorClass: 'popup__error_visible'
    //   }); 
    
    // //разрешение валидации
    // export function enableValidation(settings) {
    //     const forms = document.querySelectorAll(settings.formSelector);
    //     forms.forEach(form => {
    //         form.addEventListener('submit', function (evt) {
    //             evt.preventDefault();
    //             const nameField = form.querySelector('input[name="name"]');
    //             const aboutField = form.querySelector('textarea[name="about"]');
    //             const imageUrlField = form.querySelector('input[name="imageUrl"]');
    //             const isProfileValid = validateProfileForm(nameField, aboutField);
    //             const isPlaceValid = validatePlaceForm(nameField, imageUrlField);
    //             const isValid = isProfileValid && isPlaceValid;
 
    //             if (isValid) {
    //                 // Отправка формы
    //             }
    //         });
    //     });
    // }
   
    // function clearValidation(form, settings) {
    //     const inputs = form.querySelectorAll(settings.inputSelector);
    //     inputs.forEach(input => {
    //         input.classList.remove(settings.inputErrorClass);
    //         const errorMessage = form.querySelector(`.${settings.errorClass}`);
    //         if (errorMessage) {
    //             errorMessage.remove();
    //         }
    //     });
    //     const submitButton = form.querySelector(settings.submitButtonSelector);
    //     submitButton.classList.add(settings.inactiveButtonClass);
    // }
    
    export const validationConfig = { 
        formSelector: ".popup__form", 
        inputSelector: ".popup__input", 
        submitButtonSelector: '.popup__button', 
        inactiveButtonClass: 'popup__button_disabled', 
        inputErrorClass: "popup__input_type_error", 
        errorClass: "popup__error_visible", 
      }; 
     
    const showInputError = (formElement, inputElement, errorMessage, validationConfig) => { 
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
        inputElement.classList.add(validationConfig.inputErrorClass); 
        errorElement.textContent = errorMessage; 
        errorElement.classList.add(validationConfig.errorClass); 
    } 
     
    const hideInputError = (formElement, inputElement, validationConfig) => { 
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
        console.log(`errorElement - ${errorElement}`) 
        console.log(`inputElement.id - ${inputElement.id}`) 
        inputElement.classList.remove(validationConfig.inputErrorClass); 
        errorElement.classList.remove(validationConfig.errorClass); 
        errorElement.textContent = ""; 
    } 
     
    const isValid = (formElement, inputElement, validationConfig) => { 
        if (inputElement.validity.patternMismatch) { 
            inputElement.setCustomValidity(inputElement.dataset.errorMessage); 
        }  
        else { 
            inputElement.setCustomValidity(""); 
        } 
     
        if (!inputElement.validity.valid) { 
            showInputError( 
                formElement, 
                inputElement, 
                inputElement.validationMessage, 
                validationConfig 
            ); 
        } 
        else { 
            hideInputError(formElement, inputElement, validationConfig); 
        } 
    } 
     
    const setEventListeners = (formElement, validationConfig) => { 
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
       
        const buttonElement = formElement.querySelector( 
            validationConfig.submitButtonSelector 
          ); 
          toggleButtonState(inputList, buttonElement); 
         
          inputList.forEach((inputElement) => { 
            inputElement.addEventListener("input", () => { 
              isValid(formElement, inputElement, validationConfig); 
              toggleButtonState(inputList, buttonElement); 
            }); 
          }); 
        }; 
         
     
      export const enableValidation = (validationConfig) => { 
        const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 
       
        formList.forEach((formElement) => { 
            formElement.addEventListener("submit", function (evt) { 
              evt.preventDefault(); 
            }); 
            setEventListeners(formElement, validationConfig); 
          }); 
      }; 
      const hasInvalidInput = (inputList) => { 
        return inputList.some((inputElement) => { 
          return !inputElement.validity.valid; 
        }); 
      }; 
       
      const toggleButtonState = (inputList, buttonElement) => { 
        if (hasInvalidInput(inputList)) { 
          buttonElement.disabled = true; 
          buttonElement.classList.add(validationConfig.inactiveButtonClass); 
        } else { 
          buttonElement.disabled = false; 
          buttonElement.classList.remove(validationConfig.inactiveButtonClass); 
        } 
      }; 
       
      export function clearValidation(formElement, validationConfig) { 
          const inputList = Array.from( 
            formElement.querySelectorAll(validationConfig.inputSelector) 
          ); 
          const buttonElement = formElement.querySelector( 
            validationConfig.submitButtonSelector 
          ); 
         
          inputList.forEach((inputElement) => 
            hideInputError(formElement, inputElement, validationConfig) 
          ); 
          toggleButtonState(inputList, buttonElement, validationConfig); 
        } 