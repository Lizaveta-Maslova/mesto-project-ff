// export const config = {
//     baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
//     headers: {
//       authorization: 'e2acaa93-3a89-4dce-96f0-0dcf28c0d2e9',
//       'Content-Type': 'application/json'
//     }
//   }

//   export function handleResponse(res) { 
//     if (res.ok) { 
//       return res.json(); 
//     } 
//     return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`); 
//   } 
   
//   export function getUserInfo() { 
//     return fetch(`${config.baseUrl}/users/me`, { 
//       method: "GET", 
//       headers: config.headers, 
//     }).then(handleResponse); 
//   } 
   
//   export function getInitialCards() { 
//     return fetch(`${config.baseUrl}/cards`, { 
//       method: "GET", 
//       headers: config.headers, 
//     }).then(handleResponse); 
//   } 
   
//   export function editProfileInfo(name, about) { 
//     return fetch(`${config.baseUrl}/users/me`, { 
//       method: "PATCH", 
//       headers: config.headers, 
//       body: JSON.stringify({ 
//         name: name, 
//         about: about, 
//       }), 
//     }).then(handleResponse); 
//   } 
   
//   export function addNewCard(name, link) { 
//     return fetch(`${config.baseUrl}/cards`, { 
//       method: "POST", 
//       headers: config.headers, 
//       body: JSON.stringify({ 
//         name: name, 
//         link: link, 
//       }), 
//     }).then(handleResponse); 
//   } 
   
//   export function deleteCardServer(card) { 
//     return fetch(`${config.baseUrl}/cards/${card._id}`, { 
//       method: "DELETE", 
//       headers: config.headers, 
//     }).then(handleResponse); 
//   } 
   
   
//   export function addLike(card) { 
//     return fetch(`${config.baseUrl}/cards/likes/${card._id}`, { 
//       method: "PUT", 
//       headers: config.headers, 
//     }).then(handleResponse); 
//   } 
   
//   export function removeLike(card) { 
//     return fetch(`${config.baseUrl}/cards/likes/${card._id}`, { 
//       method: "DELETE", 
//       headers: config.headers, 
//     }).then(handleResponse); 
//   } 
   
//   export function changeUserAvatar(avatar) { 
//     return fetch(`${config.baseUrl}/users/me/avatar`, { 
//       method: "PATCH", 
//       headers: config.headers, 
//       body: JSON.stringify({ 
//         avatar, 
//       }), 
//     }).then(handleResponse); 
//   } 
  
return fetch('https://nomoreparties.co/v1/cohort-42/cards', {
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });