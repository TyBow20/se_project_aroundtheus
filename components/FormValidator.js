export default class FormValidator {
  constructor(settings, formElement) {
    // Store the settings and form element as instance variables
    this._settings = settings;
    this._form = formElement;

    // Find the submit button and store it as an instance variable
    this._submitButton = this._form.querySelector(
      settings.submitButtonSelector
    );
  }

  // Enable form validation by adding event listeners to the form fields
  enableValidation() {
    // Prevent the form from submitting automatically
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    // Loop through all the input fields in the form
    const inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    inputList.forEach((input) => {
      // Add event listeners to each input field
      input.addEventListener("input", () => {
        // Check the validity of the input field and update its error message if needed
        this._checkInputValidity(input);

        // Update the state of the submit button based on the validity of the form
        this._toggleButtonState();
      });
    });

    // Set the initial state of the submit button
    this._toggleButtonState();
  }

  // Reset the form validation and clear all the error messages
  resetValidation() {
    // Loop through all the input fields in the form
    const inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    inputList.forEach((input) => {
      // Clear the error message for each input field
      this._hideInputError(input);
    });

    // Reset the state of the submit button
    this._toggleButtonState();
  }

  // Disable the submit button
  disableSubmitButton() {
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.disabled = false;
  }

  // Private method to check the validity of an input field and update its error message
  _checkInputValidity(input) {
    if (input.validity.valid) {
      // If the input is valid, hide the error message
      this._hideInputError(input);
    } else {
      // If the input is invalid, show the error message
      this._showInputError(input, input.validationMessage);
    }
  }

  // Private method to show an error message for an input field
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = errorMessage;
    input.classList.add(this._settings.inputErrorClass);
  }

  // Private method to hide the error message for an input field
  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(this._settings.inputErrorClass);
  }

  // Private method to toggle the state of the submit button based on the validity of the form
  _toggleButtonState() {
    if (this._form.checkValidity()) {
      // If the form is valid, enable the submit button
      this.enableSubmitButton();
    } else {
      // If the form is invalid, disable the submit button
      this.disableSubmitButton();
    }
  }
}

const settings = {
  formSelector: ".modal__form", //.modal__form?
  inputSelector: ".form__input",
  submitButtonSelector: ".form__popup-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};
