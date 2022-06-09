import { SUBSCRIBE_NEWSLETTER_ENDPOINT } from "./apiUrl.js";

const form = document.getElementById("emailForm");
const stautsDiv = document.getElementById("status");
const icon = document.createElement("i");
icon.classList.add("fa", "fa-3x");
const h3 = document.createElement("h3");

const showError = () => {
  stautsDiv.className = "error";
  icon.classList.remove("fa-circle-o-notch", "fa-spin");
  icon.classList.add("fa-exclamation");
  h3.innerText = "Oh no, qualcosa è andato storto, riprova più tardi";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const email = formData.get("email");
  const agreement = formData.get("checkEmail") === "on" ? true : false;
  //const formData = new FormData(event.target);

  form.style = "display: none;";
  stautsDiv.appendChild(icon);
  stautsDiv.appendChild(h3);
  icon.classList.add("fa-circle-o-notch", "fa-spin");
  const payload = {
    email: email,
    agreement: agreement,
  };

  gtag("event", "email_form_click");

  fetch(SUBSCRIBE_NEWSLETTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log("OK");
        stautsDiv.className = "confirm";
        icon.classList.remove("fa-circle-o-notch", "fa-spin");
        icon.classList.add("fa-check");
        h3.innerText = "Grazie per esserti iscritto all'accesso anticipato!";
        gtag("event", "email_confirmed", {
          commercial_consent: payload.agreement,
        });
      }
      if (data.status === 422) {
        showError();
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
      showError();
    });
});
