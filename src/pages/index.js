// index.js
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utlis/components.js";
import Api from "../components/Api.js";

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

const modals = document.querySelectorAll(".modal_input_modal");

const addCardFormValidator = new FormValidator(settings, profileAddModal);
const editProfileFormValidator = new FormValidator(settings, profileEditModal);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

const popupWithImage = new PopupWithImage("#card-open-modal");

popupWithImage.setEventListeners();

const handleCardClick = (cardData) => {
  popupWithImage.open(cardData.link, cardData.name);
};

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleCardClick, api);
  return card.createCardElement();
};

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "35337f3b-35e8-4dc0-a9b5-b6c4dd4127c3",
    "Content-Type": "application/json",
  },
});

let cardList;

api.getInitialCards().then((result) => {
  const section = new Section(
    {
      items: result,
      renderer: (item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
      },
    },
    ".gallery__cards"
  );

  section.renderItems();

  cardList = section;
});

const loggedInUser = api.getUserInfo();
loggedInUser.then((result) => {
  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    pictureSelector: ".profile__image",
    userData: result,
  });
  userInfo.setUserInfo();
});

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  // profileTitle.textContent = profileNameInput.value;
  // profileDescription.textContent = profileDescriptionInput.value;
  // editProfileFormValidator.disableSubmitButton();
  const inputValues = profileEditPopup.getInputValues();
  // userInfo.setUserInfo({
  //   name: inputValues.Name,
  //   job: inputValues.Title,
  // });
  api.updateUserInfo({ name: inputValues.Name, about: inputValues.Title });
};

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

const handleNewCardSubmit = (e) => {
  e.preventDefault();
  // const newName = addTitleInput.value;
  // const newLink = addProfileUrl.value;
  // addCardFormValidator.disableSubmitButton();
  const inputValues = addNewCardPopUp.getInputValues();

  const cardData = {
    name: inputValues.Name,
    link: inputValues.Title,
  };
  api.addNewCard(cardData).then((data) => {
    // find template, copy it, fill with the data from card, render using prepend
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
  });
  // const cardElement = createCard(cardData);
  // section.addItem(cardElement);
};

const addNewCardPopUp = new PopupWithForm(
  "#profile-add-modal",
  handleNewCardSubmit
);

const imageCloseButton = cardOpenModal.querySelector("#image-close-button");

const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardListEl = document.querySelector(".gallery__cards");

const addEditForm = profileAddModal.querySelector("#add-edit-form");

profileEditPopup.setEventListeners();
addNewCardPopUp.setEventListeners();

profileEditButton.addEventListener("click", () => {
  // profileNameInput.value = profileTitle.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  // openPopup(profileEditModal);

  // const userData = userInfo.getUserInfo();
  // profileNameInput.value = userData.name;
  // profileDescriptionInput.value = userData.job;

  editProfileFormValidator.disableSubmitButton();
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addNewCardPopUp.open();
  addCardFormValidator.disableSubmitButton();
  // openPopup(profileAddModal);
});

// profileEditForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   profileTitle.textContent = profileNameInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);
// });

// addEditForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newName = addTitleInput.value;
//   const newLink = addProfileUrl.value;
//   addTitleInput.value = "";
//   addProfileUrl.value = "";
//   // addCardSubmitButton.disabled = true;
//   addCardFormValidator.disableSubmitButton();
//   const cardData = {
//     name: newName,
//     link: newLink,
//   };

//   const cardElement = createCard(cardData);
//   cardListEl.prepend(cardElement);
//   closePopup(profileAddModal);
// });

// modals.forEach((formElement) => {
//   const validator = new FormValidator(settings, formElement);
//   validator.enableValidation();
// });

// Notes

// replaced with 8
// initialCards.forEach((cardData) => {
//   // const cardElement = getCardElement(cardData);
//   // const myInstance = new Card(cardData, "#card-template");
//   // const cardElement = myInstance.createCardElement(cardData);
//   const cardElement = createCard(cardData);
//   cardListEl.append(cardElement);
// });

// initialCards.forEach((cardData) => {
//   const myCard = new Card(cardData, "#card-template");
//   const cardElement = myCard.createCard(cardData);
//   cardListEl.append(cardElement);
// });

// profileEditModal.addEventListener("click", closeModalOnRemoteClick);

// profileAddModal.addEventListener("click", (event) => {
//   if (
//     event.target.classList.contains("modal") ||
//     event.target.classList.contains("modal__close")
//   ) {
//     closePopup(profileAddModal);
//   }
// });

// cardOpenModal.addEventListener("click", (event) => {
//   if (
//     event.target.classList.contains("modal") ||
//     event.target.classList.contains("modal__close")
//   ) {
//     closePopup(cardOpenModal);
//   }
// });

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

//darken effect

document
  .querySelector(".profile__avatar")
  .addEventListener("mouseenter", function () {
    document.querySelector(".profile__image").style.filter = "brightness(0.2)";
  });

document
  .querySelector(".profile__avatar")
  .addEventListener("mouseleave", function () {
    document.querySelector(".profile__image").style.filter = "brightness(1)";
  });

// adding likes
