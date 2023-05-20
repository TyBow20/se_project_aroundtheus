export function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapePress);
}

export function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapePress);
}

function handleEscapePress(e) {
  if (e.key == "Escape") {
    const popup = document.querySelector(".modal_opened");
    closePopup(popup);
  }
}

export function clickDeleteButton(e) {
  e.target.closest(".card").remove();
}

export function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}
