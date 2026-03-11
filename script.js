//all variable selection

let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector(".form-container form");

const imageUrl = document.querySelector(
  'input[placeholder="https://example.com/photo.jpg"]',
);

const fullName = document.querySelector('input[placeholder="Enter full name"]');

const homeTown = document.querySelector('input[placeholder="Enter home town"]');

const purpose = document.querySelector(
  'input[placeholder="e.g., Quick appointment note"]',
);

const categories = document.querySelectorAll('input[name="category"]');

const submitBtn = document.querySelector(".submit-btn");

const closeBtn = document.querySelector(".closeForm");

//code starts here

function saveToLocalStorage(obj) {
  //Retrive the old localStorage data
  let oldTasks = [];

  if (localStorage.getItem("tasks") === null) {
    oldTasks.push(obj);

    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

addNote.addEventListener("click", () => {
  formContainer.style.display = "block";
});

closeForm.addEventListener("click", () => {
  formContainer.style.display = "none";
});

function makeValidaiton() {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const img = imageUrl.value.trim();
    const name = fullName.value.trim();
    const town = homeTown.value.trim();
    const notePurpose = purpose.value.trim();

    let selected = false;

    categories.forEach((cat) => {
      if (cat.checked) {
        selected = cat.value;
      }
    });

    if (img === "") {
      alert("Image URL is required");
      return false;
    }

    if (name === "") {
      alert("Full name is required");
      return false;
    }

    if (town === "") {
      alert("Home town is required");
      return false;
    }

    if (notePurpose === "") {
      alert("Purpose is required");
      return false;
    }

    if (!selected) {
      alert("Please select the category.");
      return;
    }

    saveToLocalStorage({
      img,
      name,
      town,
      notePurpose,
      selected,
    });
  });
  // calling the validation function
}
showCards(); // 🔹 render cards again
updateStack(); // 🔹 fix stack order

form.reset();
formContainer.style.display = "none";
makeValidaiton();

function showCards() {
  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  allTasks.forEach((task) => {
    // select stack container
    const stack = document.querySelector(".stack");

    // create card
    const card = document.createElement("div");
    card.classList.add("card");

    // avatar image
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = task.img;
    avatar.alt = "User";

    // name
    const name = document.createElement("h2");
    name.textContent = task.name;

    // info container
    const info = document.createElement("div");
    info.classList.add("info");

    // hometown
    const town = document.createElement("span");
    town.textContent = task.town;

    // purpose
    const purpose = document.createElement("span");
    purpose.textContent = task.notePurpose;

    // buttons container
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    // call button
    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.textContent = "Call";

    // message button
    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    // append structure

    info.appendChild(town);
    info.appendChild(purpose);

    buttons.appendChild(callBtn);
    buttons.appendChild(msgBtn);

    card.appendChild(avatar);
    card.appendChild(name);
    card.appendChild(info);
    card.appendChild(buttons);

    stack.appendChild(card);
  });
}
showCards();

function updateStack() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(function (card, index) {
    card.style.zIndex = 3 - index;
    card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.02})`;
    card.style.opacity = `${1 - index * 0.02}`;
  });
}

upBtn.addEventListener("click", () => {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    //update
    updateStack();
  }
});
downBtn.addEventListener("click", () => {
  const firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
    //update
    updateStack();
  }
});
