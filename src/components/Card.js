import Api from "./Api.js";
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
    this._cardImageEl.id = this._cardData._id;
    this._cardImageEl.alt = this._cardData.name;
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
        api.deleteCard(confrimDelete.id);
      }
    );
    deleteConfirmationPopup.setEventListeners();
    deleteConfirmationPopup.open();
    // e.target.closest(".card").remove();
  }
}
