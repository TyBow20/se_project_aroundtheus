import { openPopup, closePopup } from "../utlis/utils.js";

export default class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content
      .firstElementChild;
    return cardTemplate;
  }

  _setEventListeners(cardElement, cardData) {
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", (e) => {
      likeButton.classList.toggle("card__like-button-active");
    });

    const deleteButton = cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", this._clickDeleteButton);

    const cardImageEl = cardElement.querySelector(".card__image");
    const cardOpenModal = document.querySelector("#card-open-modal");
    cardImageEl.addEventListener("click", (e) => {
      openPopup(cardOpenModal);
      const modalText = cardOpenModal.querySelector(".modal__text");
      modalText.innerText = cardData.name;
      const cardImage = cardOpenModal.querySelector(".modal__image");
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
    });
  }

  createCardElement() {
    const cardElement = this._getTemplate().cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._cardData.name;
    const cardImageEl = cardElement.querySelector(".card__image");
    cardImageEl.src = this._cardData.link;
    cardImageEl.alt = this._cardData.name;
    this._setEventListeners(cardElement, this._cardData);
    return cardElement;
  }

  _clickDeleteButton(e) {
    e.target.closest(".card").remove();
  }
}
