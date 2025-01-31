 
 const config = { 
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-31", 
    headers: { 
      authorization: "9bf2cfa8-31b3-4b3f-a018-20d566e04f8d", 
      "Content-Type": "application/json", 
    }, 
  };

  export function handleResponse(res) { 
    if (res.ok) { 
      return res.json(); 
    } 
    // если ошибка, отклоняем промис
    return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`); 
  }

  //аватар-1
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(handleResponse);
  } 
   
  //карточки-2
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(handleResponse);
  } 

  //обновление пользователя-3
  export const updateUserInfo = (name, about, avatar) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar
      })
    })
    .then(handleResponse);
  } 
   
  //добавление новой карточки
  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(handleResponse);
  } 

  //удаление карточки, которая создана мной
  export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(handleResponse);
  } 
  
  export const likeCard = (card) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(handleResponse);
  } 

  export const unLikeCard = (card) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(handleResponse);
  } 
  
    //обновление аватара
    export const updateAvatar = (link) => {
      return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(handleResponse);
    } 