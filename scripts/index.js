const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
      name: "Bald Mountians",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
  ];

  const profileEditButton = document.querySelector("#profile-edit-button");
  const profileEditModal = document.querySelector('#profile-edit-modal');
  const profileCloseButton = document.querySelector("#profile-close-button");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileInput = document.querySelector("#profile-title-input");
  const profileDescriptionInput = document.querySelector("#profile-description-input");

  const cardTemplate = document.querySelector("#card-template").content.firstElementChild;


// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector('.card__image');
//   const cardTitleEl = cardElement.querySelector('.card__title');
//   cardTitleEl.textContent = cardData.name;
// }

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardTitleEl = cardElement.querySelector('.card__title');
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}



  profileEditForm = profileEditModal.querySelector(".modal__form");
  const cardListEl = document.querySelector('.gallery__cards');

  profileEditButton.addEventListener("click", () => {
  profileInput.value =profileTitle.textContent;
  profileDescriptionInput.value =profileDescription.textContent;
  profileEditModal.classList.add('modal_opened');
});

profileCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove('modal_opened');
});

profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitle.textContent =profileInput.value;
  profileDescription.textContent =profileDescriptionInput.value;
  profileEditModal.classList.remove('modal_opened');
});

initialCards.forEach((cardData) => {
// const cardElement = cardTemplate.cloneNode(true);
// const cardImageEl = cardElement.querySelector('.card__image');
// const cardTitleEl = cardElement.querySelector('.card__title');
// cardTitleEl.textContent = cardData.name;
// return cardElement;
const cardElement = getCardElement(cardData);
cardImageEl.append(cardElement);
});