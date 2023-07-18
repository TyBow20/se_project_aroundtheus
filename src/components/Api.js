export default class Api {
  constructor(options) {
    // constructor body
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      method: "GET",
      //headers: this.headers, in order to work, need to change request
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

  updateUserInfo(userInfo) {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "PATCH",
      headers: {
        authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    });
  }

  addNewCard(cardData) {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      method: "POST",
      headers: {
        authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => res.json());
  }

  deleteCard(cardId) {
    return fetch(
      "https://around.nomoreparties.co/v1/cohort-3-en/cards/" + cardId,
      {
        method: "DELETE",
        headers: {
          authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
          "Content-Type": "application/json",
        },
      }
    );
  }

  updateProfilePicture(link) {
    return fetch(
      "https://around.nomoreparties.co/v1/cohort-3-en/users/me/avatars",
      {
        method: "PATCH",
        headers: {
          authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: link,
        }),
      }
    );
  }

  //added new code here

  //   likeCard(cardId, isLike) {
  //     return fetch(
  //       "https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/cardId",
  //       {
  //         method: isLIke ? "PUT" : "DELETE",
  //         headers: {
  //           authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(`Error: ${res.status}`);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }

  //   unlikeCard(cardId) {
  //     return fetch(
  //       "https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/cardId",
  //       {
  //         method: "DELETE",
  //         headers: {
  //           authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(`Error: ${res.status}`);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }

  updateUserAvatar(avatarLink) {
    return fetch(
      "https://around.nomoreparties.co/v1/cohort-3-en/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarLink,
        }),
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  //combined likes

  toggleLikeOnCard(cardId, isLike) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${cardId}`,
      {
        method: isLike ? "PUT" : "DELETE",
        headers: {
          authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
          "Content-Type": "application/json",
        },
      }
    )
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
}
