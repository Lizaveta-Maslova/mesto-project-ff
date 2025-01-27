 
 const config = { 
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-31", 
    headers: { 
      authorization: "9bf2cfa8-31b3-4b3f-a018-20d566e04f8d", 
      "Content-Type": "application/json", 
    }, 
  }; 

  //аватар
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  } 
   
  //карточки
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  } 

  //обновление пользователя
  export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  } 
   
  // export function handleResponse(res) { 
  //   if (res.ok) { 
  //     return res.json(); 
  //   } 
  //   return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`); 
  // } 
   
  // export function getUserInfo() { 
  //   return fetch(`${config.baseUrl}/users/me`, { 
  //     method: "GET", 
  //     headers: config.headers, 
  //   }).then(handleResponse); 
  // } 
   
  // export function getInitialCards() { 
  //   return fetch(`${config.baseUrl}/cards`, { 
  //     method: "GET", 
  //     headers: config.headers, 
  //   }).then(handleResponse); 
  // } 
   
  // export function editProfileInfo(name, about) { 
  //   return fetch(`${config.baseUrl}/users/me`, { 
  //     method: "PATCH", 
  //     headers: config.headers, 
  //     body: JSON.stringify({ 
  //       name: name, 
  //       about: about, 
  //     }), 
  //   }).then(handleResponse); 
  // } 
   
  // export function addNewCard(name, link) { 
  //   return fetch(`${config.baseUrl}/cards`, { 
  //     method: "POST", 
  //     headers: config.headers, 
  //     body: JSON.stringify({ 
  //       name: name, 
  //       link: link, 
  //     }), 
  //   }).then(handleResponse); 
  // } 
   
  // export function deleteCardServer(card) { 
  //   return fetch(`${config.baseUrl}/cards/${card._id}`, { 
  //     method: "DELETE", 
  //     headers: config.headers, 
  //   }).then(handleResponse); 
  // } 
   
   
  // export function addLike(card) { 
  //   return fetch(`${config.baseUrl}/cards/likes/${card._id}`, { 
  //     method: "PUT", 
  //     headers: config.headers, 
  //   }).then(handleResponse); 
  // } 
   
  // export function removeLike(card) { 
  //   return fetch(`${config.baseUrl}/cards/likes/${card._id}`, { 
  //     method: "DELETE", 
  //     headers: config.headers, 
  //   }).then(handleResponse); 
  // } 
   
  // export function changeUserAvatar(avatar) { 
  //   return fetch(`${config.baseUrl}/users/me/avatar`, { 
  //     method: "PATCH", 
  //     headers: config.headers, 
  //     body: JSON.stringify({ 
  //       avatar, 
  //     }), 
  //   }).then(handleResponse); 
  // } 
  
   