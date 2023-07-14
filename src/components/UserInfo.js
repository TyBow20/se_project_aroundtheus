export default class UserInfo {
  constructor({ nameSelector, jobSelector, pictureSelector, userData }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
    this.pictureElement = document.querySelector(pictureSelector);
    this.userData = userData;
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      job: this.jobElement.textContent,
    };
  }

  updateUserInfo({ name, job }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }

  setUserInfo() {
    this.nameElement.textContent = this.userData.name;
    this.jobElement.textContent = this.userData.about;
    this.pictureElement.src = this.userData.avatar;
  }
}

// JS

// popupWithForm.setFormSubmitHandler((data) => {
//   userInfo.setUserInfo(data);
//   popupWithForm.close();
// });
