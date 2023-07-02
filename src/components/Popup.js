// export default class Popup{
//     constructor({popupselector}) {
//         this._popupElement = document.querySelector(popupselector);
//     }
// }

// open() {
// //opens the popup
// }

// close() {
// //closes the popup
// }

// _handleEscClose() {
// // listens for escape sequences
// }

// setEventListeners() {
// //sets the event listeners
// }

// set up the popup

export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.closeIcon = this.popup.querySelector(".modal__close");
    this.handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("modal_opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  close() {
    this.popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeIcon.addEventListener("click", () => {
      this.close();
    });

    this.popup.addEventListener("click", (e) => {
      if (e.target === this.popup) {
        this.close();
      }
    });
  }
}

// use in JS

// Create an instance of Popup
// const myPopup = new Popup("#my-popup");

// // Open the popup
// myPopup.open();

// // Close the popup
// myPopup.close();

// // Set event listeners for the popup
// myPopup.setEventListeners();
