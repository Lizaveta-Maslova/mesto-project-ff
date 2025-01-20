if (validity === false) {
    resetButton.setAttribute('disabled', true)
    resetButton.setAttribute('style', 'background-color: #f1f1f1')
    }

    function highlightError(field) {
        field.classList.add("error-highlight");
    }
    

    function validateProfileForm(nameField, aboutField) {
        let isValid = true;
        if (!nameField.value || nameField.value.length < 2 || nameField.value.length > 40) {
            showError(nameField, "Имя должно быть от 2 до 40 символов");
            isValid = false;
        }
        if (!aboutField.value || aboutField.value.length < 2 || aboutField.value.length > 200) {
            showError(aboutField, "О себе должно быть от 2 до 200 символов");
            isValid = false;
        }
        return isValid;
    }
   
    function validatePlaceForm(nameField, imageUrlField) {
        let isValid = true;
        const namePattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-]+$/;
        if (!nameField.value || nameField.value.length < 2 || nameField.value.length > 30 || !namePattern.test(nameField.value)) {
            showError(nameField, "Название должно быть от 2 до 30 символов и содержать только допустимые символы");
            isValid = false;
        }
        
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!imageUrlField.value || !urlPattern.test(imageUrlField.value)) {
            showError(imageUrlField, "Ссылка на картинку должна быть корректной");
            isValid = false;
        }
        return isValid;
    }
    
    function enableValidation(settings) {
        const forms = document.querySelectorAll(settings.formSelector);
        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const nameField = form.querySelector('input[name="name"]');
                const aboutField = form.querySelector('textarea[name="about"]');
                const imageUrlField = form.querySelector('input[name="imageUrl"]');
                const isProfileValid = validateProfileForm(nameField, aboutField);
                const isPlaceValid = validatePlaceForm(nameField, imageUrlField);
                const isValid = isProfileValid && isPlaceValid;
 
                if (isValid) {
                    // Отправка формы
                }
            });
        });
    }
   
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
    