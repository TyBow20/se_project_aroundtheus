// child class of Popup

import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit, confirmationButtonSelector) {
    console.log(popupSelector);
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._confirmationButton = this.popup.querySelector(
      confirmationButtonSelector
    );
  }

  setId(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }

  setCard(card) {
    this._card = card;
  }

  removeCard() {
    this._card.remove();
  }

  setEventListeners() {
    console.log(this._confirmationButton);
    this._confirmationButton.addEventListener("click", this._handleFormSubmit);
    // this.popup.addEventListener("submit", (e) => {
    //   this._handleFormSubmit();
    // });

    super.setEventListeners();
  }
}
