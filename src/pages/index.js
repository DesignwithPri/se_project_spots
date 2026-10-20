import "./index.css";
import Api from "../utils/Api.js";

import {
  validationSettings,
  enableValidation,
  resetValidation
} from "../scripts/validation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "025f5b91-549e-43e0-ab8b-a31a0217b24f",
    "Content-Type": "application/json",
  },
}); 

const editProfileBtn = document.querySelector(".profile__edit-button");
const newPostBtn = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileAvatar = document.querySelector(".profile__avatar");

const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarForm = document.forms["edit-avatar"];
const avatarInput = document.querySelector("#profile-avatar-input");
const avatarEditBtn = document.querySelector(".profile__avatar-button");

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteCardForm = document.forms["delete-card"];

const cancelDeleteBtn =
  deleteModal.querySelector(".modal__cancel-btn");

let selectedCard;
let selectedCardId;

api
  .getUserInfo()
  .then((userData) => {
    console.log(userData);

    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.src = userData.avatar;
  })
  .catch(console.error);

const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");
const editProfileForm = document.forms["edit-profile"];

const addCardFormElement = document.forms["new-post"];
const cardCaptionInput = document.querySelector("#card-caption-input");
const cardImageInput = document.querySelector("#card-image-input");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

enableValidation(validationSettings);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

cardImage.src = data.link;
cardImage.alt = data.name;
cardTitle.textContent = data.name;

if (data.isLiked) {
  likeButton.classList.add("card__like-button_liked");
}

likeButton.addEventListener("click", () => {
  const isLiked = likeButton.classList.contains("card__like-button_liked");

  if (isLiked) {
    api
      .removeLike(data._id)
      .then(() => {
        likeButton.classList.remove("card__like-button_liked");
      })
      .catch(console.error);
  } else {
    api
      .addLike(data._id)
      .then(() => {
        likeButton.classList.add("card__like-button_liked");
      })
      .catch(console.error);
  }
});

deleteButton.addEventListener("click", function (evt) {
  evt.stopPropagation();

  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
});

  cardImage.addEventListener("click", function () {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

const editProfileInputList = Array.from(
  editProfileForm.querySelectorAll(".modal__input")
);

const addCardInputList = Array.from(
  addCardFormElement.querySelectorAll(".modal__input")
);

const editAvatarInputList = Array.from(
  editAvatarForm.querySelectorAll(".modal__input")
);

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileJob.textContent;
  resetValidation(editProfileForm, editProfileInputList, validationSettings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  resetValidation(addCardFormElement, addCardInputList, validationSettings);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarEditBtn.addEventListener("click", function () {
  avatarInput.value = "";

  resetValidation(
    editAvatarForm,
    editAvatarInputList,
    validationSettings
  );

  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

cancelDeleteBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

deleteCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const submitButton =
    deleteCardForm.querySelector(".modal__submit-btn");

  submitButton.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Delete";
    });
});

editAvatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const submitButton = editAvatarForm.querySelector(".modal__submit-btn");
  submitButton.textContent = "Saving...";

  api
    .updateAvatar({
      avatar: avatarInput.value,
    })
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      closeModal(editAvatarModal);
      editAvatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = addCardFormElement.querySelector(".modal__submit-btn");
  submitButton.textContent = "Saving...";

  api
    .addCard({
      name: cardCaptionInput.value,
      link: cardImageInput.value,
    })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);

      addCardFormElement.reset();
      resetValidation(addCardFormElement, addCardInputList, validationSettings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);

    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const modals = document.querySelectorAll(".modal");

modals.forEach(function (modal) {
  modal.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});