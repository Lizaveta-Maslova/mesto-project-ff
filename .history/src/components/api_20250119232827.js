const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-42',
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
      'Content-Type': 'application/json'
    }
  }

  export function getInitialCards() { 
    return fetch(`${config.baseUrl}/cards`, { 
      method: "GET", 
      headers: config.headers, 
    }).then(handleResponse); 
  }  