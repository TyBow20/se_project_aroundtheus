// child class of Popup

import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this.popup.addEventListener("submit", (e) => {
      console.log(e);
    });
    super.setEventListeners();
  }
}
