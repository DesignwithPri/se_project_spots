const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/places/val-thorens.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/places/restaurant-terrace.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/places/outdoor-cafe.jpg",
  },
  {
    name: "A very long bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/places/long-bridge.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/places/tunnel.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/places/mountain-house.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-button");
const newPostBtn = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");

const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

const editProfileForm = document.forms["edit-profile"];

const addCardFormElement = document.forms["new-post"];
const cardCaptionInput = document.querySelector("#card-caption-input");
const cardImageInput = document.querySelector("#card-image-input");

const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileJob.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = descriptionInput.value;

  closeModal(editProfileModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardTitle = cardCaptionInput.value;
  const cardImage = cardImageInput.value;

  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  cardElement.innerHTML = `
    <img class="card__image" src="${cardImage}" alt="${cardTitle}">
    <div class="card__content">
      <h2 class="card__title">${cardTitle}</h2>
      <button class="card__like-button" type="button" aria-label="Like"></button>
    </div>
  `;

  cardsList.prepend(cardElement);

  addCardFormElement.reset();
  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (card) {
  console.log(card.name);
});
