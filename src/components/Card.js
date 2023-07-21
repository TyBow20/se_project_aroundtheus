import Api from "./Api.js";

export default class Card {
  constructor(cardData, templateSelector, handleCardClick, handleCardDelete) {
    console.log(handleCardDelete);
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._likeButton = null;
    this._cardImageEl = null;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    // this._api = api;
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

    // this._api
    //   .toggleLikeOnCard(this._cardData._id, !isLiked)
    //   .then((data) => {
    //     this._likes = data.likes;
    //     this._likeButton.classList.toggle("card__like-button-active");
    //     this._cardCountEl.textContent = data.likes.length;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  _openPreview = () => {
    this._handleCardClick(this._cardData);
  };

  _clickDeleteButton = () => {
    console.log("_clickDeleteButton called ", this._handleCardDelete);
    console.log(this._cardElement);
    this._handleCardDelete(this._cardData, this._cardElement);
    // e.target.closest(".card").remove();
  };

  _setEventListeners(cardElement, cardData) {
    this._likeButton.addEventListener("click", this._toggleLike);

    const deleteButton = cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", this._clickDeleteButton);

    this._cardImageEl.addEventListener("click", this._openPreview);
  }

  createCardElement() {
    this._cardElement = this._getTemplate().cloneNode(true);
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._cardData.name;
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardCountEl = this._cardElement.querySelector(".card__like-count");
    this._cardImageEl.src = this._cardData.link;
    this._cardImageEl.id = this._cardData._id;
    this._cardImageEl.alt = this._cardData.name;
    this._cardCountEl.textContent = this._cardData.likes.length;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._setEventListeners(this._cardElement, this._cardData);
    return this._cardElement;
  }
}
