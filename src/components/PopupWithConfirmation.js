// child class of Popup

import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit, confirmationButtonSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._confirmationButton = this.popup.querySelector(
      confirmationButtonSelector
    );
  }

  setEventListeners() {
    this._confirmationButton.addEventListener("click", this._handleFormSubmit);
    // this.popup.addEventListener("submit", (e) => {
    //   this._handleFormSubmit();
    // });

    super.setEventListeners();
  }
}
