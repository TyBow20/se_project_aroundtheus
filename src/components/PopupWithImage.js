import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.popup.querySelector(".modal__image");
    this.caption = this.popup.querySelector(".modal__text");
  }

  open(imageSrc, captionText) {
    this.image.src = imageSrc;
    this.image.alt = captionText;
    this.caption.textContent = captionText;
    super.open();
  }
}
