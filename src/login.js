let loginPage = document.getElementById("loginPage");
let loginBody = document.createElement("div");
let signupButton, loginButton, submitButton;
loginBody.setAttribute("id", "replace");
let signupBody = document.createElement("div");
signupBody.setAttribute("id", "replace");
window.onload = () => {
  let spanTexts = document.getElementsByClassName("backLetter");
  for (spanText of spanTexts) {
    spanText.classList.add("active");
  }

  fetch("components/loginForm.html")
    .then((response) => response.text())
    .then((html) => (loginBody.innerHTML = html.trim()));
  fetch("components/signUp.html")
    .then((response) => response.text())
    .then((html) => (signupBody.innerHTML = html.trim()));
  loginPage.appendChild(loginBody);
};
let spanLetters = document.getElementsByClassName("backLetter");
let spanTexts = document.getElementById("backText");

spanTexts.addEventListener("mouseover", function () {
  for (spanLetter of spanLetters) {
    spanLetter.classList.remove("active");
    spanLetter.classList.add("activeG");
  }
});

// Add a mouseout event listener to the div element
spanTexts.addEventListener("mouseout", function () {
  for (spanLetter of spanLetters) {
    spanLetter.classList.remove("activeG");
    spanLetter.classList.add("active");
  }
});

function refreshButtons() {
  signupButton = document.getElementById("signupButton");
  loginButton = document.getElementById("loginButton");
  submitButton = document.getElementById("submit");
  console.log("here");
  submitButton.addEventListener("click", () => {
    if (checkData() != false) {
      location.href = "index.html";
    }
  });

  if (signupButton != undefined) {
    signupButton.addEventListener("click", () => {
      loginPage.removeChild(document.getElementById("replace"));
      loginPage.appendChild(signupBody);
      refreshButtons();
      setTimeout(() => {
        refreshFields();
      }, 50);
    });
  }

  if (loginButton != undefined) {
    loginButton.addEventListener("click", () => {
      loginPage.removeChild(document.getElementById("replace"));
      loginPage.appendChild(loginBody);
      refreshButtons();
    });
  }
}

function refreshFields() {
  let LastName = document.getElementById("lastName");
  let firstName = document.getElementById("firstName");
  if (LastName != null) {
    LastName.addEventListener("keyup", () => {
      if (firstName.value == "" || LastName.value == "") setDefault();
      else {
        document.getElementById("username").placeholder =
          firstName.value + LastName.value;
        document.getElementById("email").placeholder =
          firstName.value + LastName.value + "@gmail.com";
      }
    });
  }
  if (firstName != null) {
    firstName.addEventListener("keyup", () => {
      if (firstName.value == "" || LastName.value == "") setDefault();
      else {
        document.getElementById("username").placeholder =
          firstName.value + LastName.value;
        document.getElementById("email").placeholder =
          firstName.value + LastName.value + "@gmail.com";
      }
    });
  }
}

function setDefault() {
  document.getElementById("username").placeholder = "username";
  document.getElementById("email").placeholder = "email@gmail.com";
}

function checkStrength(password) {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let username = document.getElementById("username");
  if (
    "string" !== typeof password ||
    password.length < 5 ||
    (firstName !== undefined && firstName.value.length!==0 && password.includes(firstName.value)) ||
    (lastName !== undefined && lastName.value.length!==0 && password.includes(lastName.value)) ||
    (username !== undefined && username.value.length!==0 &&  password.includes(username.value))
  ) {
    return false;
  }
  return true;
}

function checkData() {
  let email = document.getElementById("email");
  if (email != null) {
    let regex = /\S+@\S+\.\S+$/;
    if (!regex.test(email.value)) {
      alert("invalid email");
      return false;
    }
  }
  let password = document.getElementById("password").value;
  if (document.getElementById("login") === null) {
    if (!checkStrength(password)) {
      alert("weak password");
      return false;
    }
  }
  return true;
}

setTimeout(() => {
  refreshButtons();
}, 50);
