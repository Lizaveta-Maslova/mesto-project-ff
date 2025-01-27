const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '9bf2cfa8-31b3-4b3f-a018-20d566e04f8d',
      'Content-Type': 'application/json'
    }
  }
  
   export  function getInitialCards() {
      return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: "GET",
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
        });
    } 
   