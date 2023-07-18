import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
export default class Card {
  constructor(cardData, templateSelector, handleCardClick, api) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._likeButton = null;
    this._cardImageEl = null;
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content
      .firstElementChild;
    return cardTemplate;
  }

  // old code, use this first

  // _toggleLike = () => {
  //   // Do some API function to handle like and unlike
  //   // After API call, update this._likes
  //   // Update like count and like button state
  //   this._likeButton.classList.toggle("card__like-button-active");
  // };

  // updated code, not sure.
  _toggleLike = () => {
    const isLiked = this._likeButton.classList.contains(
      "card__like-button-active"
    );

    this._api
      .toggleLikeOnCard(this._cardData._id, !isLiked)
      .then((data) => {
        this._likes = data.likes;
        this._likeButton.classList.toggle("card__like-button-active");
        this._cardCountEl.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  _openPreview = () => {
    this._handleCardClick(this._cardData);
  };

  _setEventListeners(cardElement, cardData) {
    this._likeButton.addEventListener("click", this._toggleLike);

    const deleteButton = cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", this._clickDeleteButton);

    this._cardImageEl.addEventListener("click", this._openPreview);
  }

  createCardElement() {
    const cardElement = this._getTemplate().cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._cardData.name;
    this._cardImageEl = cardElement.querySelector(".card__image");
    this._cardCountEl = cardElement.querySelector(".card__like-count");
    this._cardImageEl.src = this._cardData.link;
    this._cardImageEl.id = this._cardData._id;
    this._cardImageEl.alt = this._cardData.name;
    this._cardCountEl.textContent = this._cardData.likes.length;
    this._likeButton = cardElement.querySelector(".card__like-button");
    this._setEventListeners(cardElement, this._cardData);
    return cardElement;
  }

  _clickDeleteButton(e) {
    const deleteConfirmationPopup = new PopupWithConfirmation(
      "#delete-modal",
      () => {
        const confrimDelete = e.target
          .closest(".card")
          .querySelector(".card__image");

        const api = new Api({
          baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
          headers: {
            authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
            "Content-Type": "application/json",
          },
        });
        api.deleteCard(confrimDelete.id); // we delete card from server
        deleteConfirmationPopup.close(); // close modal
        e.target.closest(".card").remove();
      },
      "#confrim-delete-button"
    );
    deleteConfirmationPopup.setEventListeners();
    deleteConfirmationPopup.open();
    // e.target.closest(".card").remove();
  }
}
