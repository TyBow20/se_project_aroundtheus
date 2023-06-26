class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      job: this.jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
}

// JS

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

popupWithForm.setFormSubmitHandler((data) => {
  userInfo.setUserInfo(data);
  popupWithForm.close();
});
