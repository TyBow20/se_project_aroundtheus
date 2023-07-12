class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      method: "GET",
      headers: {
        authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me ", {
      method: "GET",
      headers: {
        authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "PATCH",
      headers: {
        authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
  }

  addNewCard() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      method: "POST",
      headers: {
        authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Pika",
        link: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQaqVA3lp9Bkf-GibvzE5GSwN9MGgXzmCVzXqCvKRTsgxwpJFDsNT-mVb-155aj5SK-Z1jA8cSYekXa2mk",
      }),
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
    "Content-Type": "application/json",
  },
});
