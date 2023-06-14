// index.js
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openPopup,
  closePopup,
  closeModalOnRemoteClick,
} from "../utlis/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountians",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCloseButton = document.querySelector("#add-close-button");
const addTitleInput = document.querySelector("#add-title-input");
const addProfileUrl = document.querySelector("#add-url-input");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const cardOpenModal = document.querySelector("#card-open-modal");
const addCardSubmitButton = profileAddModal.querySelector(
  ".form__popup-button"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   cardTitleEl.textContent = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;

//   const likeButton = cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", (e) => {
//     likeButton.classList.toggle("card__like-button-active");
//   });
//   const deleteButton = cardElement.querySelector(".card__delete");
//   deleteButton.addEventListener("click", (e) => {
//     e.target.closest(".card").remove();
//   });
//   cardImageEl.addEventListener("click", (e) => {
//     openPopup(cardOpenModal);
//     const modalText = cardOpenModal.querySelector(".modal__text");
//     modalText.innerText = cardData.name;
//     const cardImage = cardOpenModal.querySelector(".modal__image");
//     cardImage.src = cardData.link;
//     cardImage.alt = cardData.name;
//   });
//   return cardElement;
// }

// function openPopup(popup) {
//   popup.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscapePress);
// }

// function handleEscapePress(e) {
//   if (e.key == "Escape") {
//     const popup = document.querySelector(".modal_opened");
//     closePopup(popup);
//   }
// }

// function closePopup(popup) {
//   popup.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscapePress);
// }

const imageCloseButton = cardOpenModal.querySelector("#image-close-button");

const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardListEl = document.querySelector(".gallery__cards");

const addEditForm = profileAddModal.querySelector("#add-edit-form");

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

addEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = addTitleInput.value;
  const newLink = addProfileUrl.value;
  addTitleInput.value = "";
  addProfileUrl.value = "";
  addCardSubmitButton.disabled = true;
  const cardData = {
    name: newName,
    link: newLink,
  };

  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
  closePopup(profileAddModal);
});

initialCards.forEach((cardData) => {
  // const cardElement = getCardElement(cardData);
  const myInstance = new Card(cardData, "#card-template");
  const cardElement = myInstance.createCardElement(cardData);
  cardListEl.append(cardElement);
});

profileEditModal.addEventListener("click", closeModalOnRemoteClick);

profileAddModal.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal__close")
  ) {
    closePopup(profileAddModal);
  }
});

cardOpenModal.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal__close")
  ) {
    closePopup(cardOpenModal);
  }
});

const settings = {
  formSelector: ".modal__form", //.modal__form?
  inputSelector: ".form__input",
  submitButtonSelector: ".form__popup-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

const modals = document.querySelectorAll(".modal_input_modal");

modals.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  validator.enableValidation();
});

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template");
  return card.createCardElement();
};
