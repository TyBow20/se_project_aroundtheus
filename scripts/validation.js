window.alert("Hello World!");

const config = {
  formSelector: ".popup__form", //.modal__form?
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
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
    eventListener(formEl, options);
  });
}

function eventListener(formEl, options) {
  const inputEl = [...formEl.querySelectorAll(options.inputSelector)];
  inputEl.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      displayInputAccuracy(inputEl, formEl, options);
    });
  });
}

function displayInputError(inputEl, formEl, options) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  errorMessageEl.classList.add(options.inputErrorClass);
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

//disable button
//enable button
