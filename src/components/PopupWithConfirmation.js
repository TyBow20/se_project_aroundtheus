// child class of Popup

import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmationButtonSelector) {
    super(popupSelector);
    this._confirmationButton = this.popup.querySelector(
      confirmationButtonSelector
    );
    console.log(this._confirmationButton);
    this._form = this.popup.querySelector(".modal__form");
  }

  setAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    console.log(this._confirmationButton);
    this._confirmationButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    // this.popup.addEventListener("submit", (e) => {
    //   this._handleFormSubmit();
    // });

    super.setEventListeners();
  }
}
