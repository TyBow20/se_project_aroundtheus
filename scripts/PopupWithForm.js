// child class of Popup
import Popup from "./Popup.js";
class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector('.modal_input_modal')
        this.handleFormSubmit = handleFormSubmit;
    }
    close(){
        this._popupFrom.reset()
        super.close();
    }
}


// index.js

const addNewCardPopup = PopupWithForm('#profile-add-modal'), () => {

}

// call the function
newCardPopup.close();
newCardPopup.open();