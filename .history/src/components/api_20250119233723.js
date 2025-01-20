const config = {
    baseUrl: 'https://nomoreparties.co/wff-cohort-27',
    headers: {
      authorization: 'e2acaa93-3a89-4dce-96f0-0dcf28c0d2e9',
      'Content-Type': 'application/json'
    }
  }

  export function getInitialCards() { 
    return fetch(`${config.baseUrl}/cards`, { 
      method: "GET", 
      headers: config.headers, 
    }).then(handleResponse); 
  }  

  export function handleResponse(res) { 
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Что-то пошло не так. Ошибка: ё${res.status}`); 
  }  