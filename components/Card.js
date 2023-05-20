import { openPopup, closePopup, clickDeleteButton } from "../utlis/utils.js";

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

  _setEventListener(cardElement, cardData) {
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", (e) => {
      likeButton.classList.toggle("card__like-button-active");
    });

    const deleteButton = cardElement.querySelector(".card__delete");
    deleteButton.addEventListener("click", clickDeleteButton);
    // deleteButton.addEventListener("click", (e) => {
    //   e.target.closest(".card").remove();
    // });

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

  createCardElement(cardData) {
    const cardElement = this._getTemplate().cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    cardTitleEl.textContent = cardData.name;
    const cardImageEl = cardElement.querySelector(".card__image");
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    this._setEventListener(cardElement, cardData);
    return cardElement;
  }

  //   _deleteCard = () => {
  //     console.log(this);
  //     this._element.remove();
  //   };
}
