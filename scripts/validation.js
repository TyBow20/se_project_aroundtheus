const config = {
  formSelector: ".modal__form", //.modal__form?
  inputSelector: ".form__input",
  submitButtonSelector: ".form__popup-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

enableValidation(config);

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

function setEventListeners(formEl, options) {
  const inputEl = [...formEl.querySelectorAll(options.inputSelector)];
  inputEl.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      displayInputAccuracy(inputEl, formEl, options);
      toggleButtonState(formEl, options);
    });
  });
}

function displayInputError(inputEl, formEl, options) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  errorMessageEl.classList.add(options.inputErrorClass);
  errorMessageEl.innerText = inputEl.validationMessage;
}

function displayInputAccuracy(inputEl, formEl, options) {
  if (!inputEl.validity.valid) {
    displayInputError(inputEl, formEl, options);
  } else {
    hideInputError(inputEl, formEl, options);
  }
}

function hideInputError(inputEl, formEl, options) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  errorMessageEl.classList.remove(options.inputErrorClass);
}

function disableButton(buttonEl, options) {
  buttonEl.setAttribute("disabled", true);
}

function enableButton(buttonEl, options) {
  buttonEl.removeAttribute("disabled");
}

function toggleButtonState(formEl, options) {
  const buttonEl = formEl.querySelector(options.submitButtonSelector);
  enableButton(buttonEl, options);
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      disableButton(buttonEl, options);
    }
  });
}
