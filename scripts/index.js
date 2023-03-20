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

// console.log(profileDescription.textContent);

  const profileTitleInput = document.querySelector('.modal-name-item');

  profileEditButton.addEventListener("click", () => {
  profileInput.value =profileTitle.textContent;
  profileDescriptionInput.value =profileDescription.textContent;
  profileEditModal.classList.add('modal_opened');
});

profileCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove('modal_opened');
});

profileEditButton.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitle.textContent =profileInput.value;
  profileDescription.textContent =profileDescriptionInput.value;
});