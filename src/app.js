import { Question } from "./question";
import { isValid, createModal } from "./others";
import "./styles.css";
import { getAuthForm, authWithEmailAndPassword } from "./auth";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const modalBTN = document.querySelector("#modalBTN");
const submit = form.querySelector("#button-submit");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
modalBTN.addEventListener("click", openModal);
input.addEventListener("input", () => {
  submit.disabled = !isValid(input.value);
});
function submitFormHandler(e) {
  e.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    };

    submit.disabled = true;
    //Async request to server to save question
    Question.create(question).then(() => {
      input.value = "";
      input.className = "";
      submit.disabled = false;
    });
  }
}

function openModal() {
  createModal("Авторизация", getAuthForm());
  document
    .getElementById("authForm")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector("button");
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Ошибка", content);
  } else {
    createModal("список вопросов", Question.listToHTML(content));
  }
}
