import PopupWithConfirmation from "./PopupWithConfirmation.js";
export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._likeButton = null;
    this._cardImageEl = null;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content
      .firstElementChild;
    return cardTemplate;
  }

  _toggleLike = () => {
    this._likeButton.classList.toggle("card__like-button-active");
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
    this._cardImageEl.src = this._cardData.link;
    this._cardImageEl.alt = this._cardData.name;
    this._likeButton = cardElement.querySelector(".card__like-button");
    this._setEventListeners(cardElement, this._cardData);
    return cardElement;
  }

  _clickDeleteButton(e) {
    const deleteConfirmationPopup = new PopupWithConfirmation(
      "#delete-modal",
      () => {}
    );
    deleteConfirmationPopup.open();
    // e.target.closest(".card").remove();
  }
}
