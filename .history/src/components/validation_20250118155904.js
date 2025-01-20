
    // export function validateProfileForm(nameField, aboutField) {
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
   
    // export function validatePlaceForm(nameField, imageUrlField) {
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
//    export enableValidation({
//         formSelector: '.popup__form',
//         inputSelector: '.popup__input',
//         submitButtonSelector: '.popup__button',
//         inactiveButtonClass: 'popup__button_disabled',
//         inputErrorClass: 'popup__input_type_error',
//         errorClass: 'popup__error_visible'
//       }); 
    
    //разрешение валидации
    export function enableValidation(settings) {
        const forms = document.querySelectorAll(settings.formSelector); //находим все формы на странице
        console.log(forms);
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
   
    // export function clearValidation(form, settings) {
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
    
   