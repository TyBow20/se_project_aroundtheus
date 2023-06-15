export function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapePress);
  document.addEventListener("click", closeModalOnRemoteClick);
}

export function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapePress);
  document.removeEventListener("click", closeModalOnRemoteClick);
}

function handleEscapePress(e) {
  if (e.key == "Escape") {
    const popup = document.querySelector(".modal_opened");
    closePopup(popup);
  }
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.target.closest(".modal"));
  }
}
