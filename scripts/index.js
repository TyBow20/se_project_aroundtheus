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
const addNewCardButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const cardOpenModal = document.querySelector("#card-open-modal");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector('.card__image');
//   const cardTitleEl = cardElement.querySelector('.card__title');
//   cardTitleEl.textContent = cardData.name;
// }

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (e) => {
    likeButton.classList.toggle("card__like-button-active");
  });
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", (e) => {
    e.target.closest(".card").remove();
  });
  cardImageEl.addEventListener("click", (e) => {
    openPopup(cardOpenModal);
    const modalText = cardOpenModal.querySelector(".modal__text");
    modalText.innerText = cardData.name;
    const cardImage = cardOpenModal.querySelector(".modal__image");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
  });
  return cardElement;
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

const imageCloseButton = cardOpenModal.querySelector("#image-close-button");
imageCloseButton.addEventListener("click", (e) => {
  closePopup(cardOpenModal);
});

const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardListEl = document.querySelector(".gallery__cards");

const addEditForm = profileAddModal.querySelector("#add-edit-form");

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
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

addCloseButton.addEventListener("click", () => {
  closePopup(profileAddModal);
});

addEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = profileAddModal.querySelector("#add-title-input").value;
  const newLink = profileAddModal.querySelector("#add-url-input").value;
  profileAddModal.querySelector("#add-title-input").value = "";
  profileAddModal.querySelector("#add-url-input").value = "";
  const cardData = {
    name: newName,
    link: newLink,
  };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  closePopup(profileAddModal);
});

// const likeButton = document.querySelector(".card__like-button");
// likeButton.addEventListener("click", (e) => {
//  console.log(e);
// });

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  // const likeButton = cardElement.querySelector(".card__like-button");
  // likeButton.addEventListener("click", (e) => {
  //   console.log(e);
  // });

  cardListEl.append(cardElement);
});

//const cardImageEl = cardElement.querySelector(".card__image");

//cardImageEl = cardElement.addEventListener('click', (e) => {
