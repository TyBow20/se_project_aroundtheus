import { openPopup, closePopup } from "../utlis/utils.js";

export default class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._likeButton = null;
    this._cardImageEl = null;
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
    const cardOpenModal = document.querySelector("#card-open-modal");
    openPopup(cardOpenModal);
    const modalText = cardOpenModal.querySelector(".modal__text");
    modalText.innerText = this._cardData.name;
    const cardImage = cardOpenModal.querySelector(".modal__image");
    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
  };

  _setEventListeners(cardElement, cardData) {
    // const likeButton = cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", this._toggleLike);

    const deleteButton = cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", this._clickDeleteButton);

    // const cardImageEl = cardElement.querySelector(".card__image");
    const cardOpenModal = document.querySelector("#card-open-modal");
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
    e.target.closest(".card").remove();
  }
}
