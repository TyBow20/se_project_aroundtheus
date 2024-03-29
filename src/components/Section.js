export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

// const cardListEl = document.querySelector(".gallery__cards");

// const createCard = (cardData) => {
//   const cardElement = document.createElement("div");
//   // Render the card using the cardData
//   // ...
//   return cardElement;
// };

//
