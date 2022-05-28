/*
<div class="card">
  <img src="/img/stripe.png" height="150rem" alt="">
  <h2 id="nome">Stripe Dashboard</h2>
</div>
*/

import API_URL from "./apiUrl";

//Function to get parameters
const getParameter = (key) => {
  // Address of the current window
  address = window.location.search;

  // Returns a URLSearchParams object instance
  parameterList = new URLSearchParams(address);
  // Returning the respected value associated
  // with the provided key
  return parameterList.get(key);
};

/* Needed variables */
const session_id = getParameter("session_id");

/* Creating Elements */
const cardContainer = document.getElementById("cardsHolder");
const stripeCard = document.createElement("div");
const stripeImg = document.createElement("img");
const stripeDashboardLink = document.createElement("a");
const title = document.createElement("h2");

/* Setting up elements */
stripeCard.className = "card";
stripeImg.src = "/img/stripe.png";
stripeImg.height = 150;
title.id = "nome";
title.innerText = "Stripe Dashboard";
stripeDashboardLink.style = "color: var(--textColor);";

const showStripeDasboard = (link) => {
  stripeDashboardLink.href = link;
  stripeDashboardLink.appendChild(stripeCard);
  stripeCard.appendChild(stripeImg);
  stripeCard.appendChild(title);
  cardContainer.appendChild(stripeDashboardLink);
};

fetch(`${API_URL}/create-customer-portal`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sessionId: session_id,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    showStripeDasboard(data.portalUrl);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
