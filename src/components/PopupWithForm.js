// child class of Popup

import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    this._resetInputValues();
    super.close();
  }

  getInputValues() {
    const inputList = this.popup.querySelectorAll(".form__input");
    const inputValues = {};

    inputList.forEach((input) => {
      const inputName = input.name;
      const inputValue = input.value;
      inputValues[inputName] = inputValue;
    });

    return inputValues;
  }

  setEventListeners() {
    this.popup.addEventListener("submit", (e) => {
      this._handleFormSubmit(e);
      // this.close();
    });
    super.setEventListeners();
  }

  _resetInputValues() {
    const inputList = this.popup.querySelectorAll(".form__input");
    inputList.forEach((e) => {
      e.value = "";
    });
  }

  // new code
}
