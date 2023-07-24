export default class Card {
  constructor(
    cardData,
    userId,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleLikeCard
  ) {
    // console.log(handleCardDelete);
    this._cardData = cardData;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._likeButton = null;
    this._cardImageEl = null;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
    // this._api = api;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content
      .firstElementChild;
    return cardTemplate;
  }

  // old code, use this first

  // _toggleLike = () => {
  //   // Do some API function to handle like and unlike
  //   // After API call, update this._likes
  //   // Update like count and like button state
  //   this._likeButton.classList.toggle("card__like-button-active");
  // };

  // updated code, not sure.
  _toggleLike = () => {
    // check if an of the likes belong to you
    const isLiked = this._likeButton.classList.contains(
      "card__like-button-active"
    );
    this._isLiked = isLiked;
    this._handleLikeCard(this);
  };

  updateLikes(likes) {
    // console.log("update like", likes.length);

    // console.log(likes, this._cardData.likes);
    this._cardData.likes = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._cardData.likes.some((like) => like._id === this._userId);
  }

  _renderLikes() {
    this._cardCountEl.textContent = this._cardData.likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button-active");
    } else {
      this._likeButton.classList.remove("card__like-button-active");
    }
  }

  _openPreview = () => {
    this._handleCardClick(this._cardData);
  };

  _clickDeleteButton = () => {
    console.log("_clickDeleteButton called ", this._handleCardDelete);
    console.log(this._cardElement);
    this._handleCardDelete(this._cardData, this._cardElement);
    // e.target.closest(".card").remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._toggleLike);
    this._deleteButton.addEventListener("click", this._clickDeleteButton);
    this._cardImageEl.addEventListener("click", this._openPreview);
  }

  createCardElement() {
    this._cardElement = this._getTemplate().cloneNode(true);
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._cardData.name;
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardCountEl = this._cardElement.querySelector(".card__like-count");
    this._cardImageEl.src = this._cardData.link;
    this._cardImageEl.id = this._cardData._id;
    this._cardImageEl.alt = this._cardData.name;
    this._cardCountEl.textContent = this._cardData.likes.length;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete");
    console.log(this._deleteButton);
    if (this._cardData.owner._id !== this._userId) {
      this._deleteButton.remove();
    }
    this._renderLikes();
    this._setEventListeners();
    return this._cardElement;
  }
}
