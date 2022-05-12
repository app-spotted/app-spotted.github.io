// Created by Laxman Cozzarin & Spotted Team

// Script that enables the blur animation on card click
// If the card is blurred and the user clicks on main, the blur effect is removed
// If the card is blurred and another card is clicked then the current card blur effect is added and the new card blur effect removed

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

// Creating a loader icon to be added to other divs
const loader = document.createElement('i');
loader.className = "fa fa-circle-o-notch fa-spin fa-3x"

// Declearing elements
const pricesDiv = document.querySelector(".premiumCardsHolder");
pricesDiv.appendChild(loader)
const errorDiv = document.querySelector(".loadingError");
const paymentForm = document.getElementById("payment-div");
const customerId = getParameter("customerId");

const loadPricesCards = (pricesDiv) => {

  // Questo metodo ottiene le card dal server e le mostra nella 'pricesDiv'
  // nel caso non riesca ad ottenere i dati dal server mostra 'errorDiv'

  // Adding Loader Icon
  pricesDiv.appendChild(loader);

  // Starting to get plans from API
  fetch("http://localhost:5000/config")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      pricesDiv.removeChild(loader)
      pricesDiv.innerHTML = "";
      if (!data) {
        pricesDiv.innerHTML = `
                <h3>No prices found</h3>
            `;
      }

      data.response.forEach((prod) => {
        prod.prices.forEach((price) => {
          pricesDiv.innerHTML += `
            <div class="card" id="${price.id}" 
            ${
              customerId
                ? `onclick="paymentAnimation(event, \'${price.id}\')"`
                : ""
            }>
            <h2 id="nome">${prod.name}</h2>
            <div class="priceButtonWithLines">
                <hr>
                <button class="priceButton" id="pricing">${
                  price.unit_amount / 100
                } / ${price.recurringInterval}</button>
                <hr>
            </div>
            <h3 id="description">${prod.description}</h3>
            </div>`;
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Loading cards on the DOM
document.addEventListener("onload", loadPricesCards(pricesDiv));


// blur animation for the card called from the html onclick (placed on the html card DOM element)
const paymentAnimation = (event, id) => {
  // Stops the event propagation to the other DOM elements (Prevents the main DOM element to recive the click event)
  event.stopImmediatePropagation();

  const card = document.getElementById(id);

  // In case the first initialisation wasn't succesful
  allCards = Array.from(document.getElementsByClassName(card.className));

  // Stops the event propagation to the other DOM elements (Prevents the main DOM element to recive the click event)
  event.stopImmediatePropagation();

  // All the cards that aren't the clicked card get the blurred effect
  allCards.forEach((otherCard) => {
    card.style.filter = "none";
    if (otherCard !== card) otherCard.style.filter = "blur(1rem)";
  });

  card.appendChild(loader)

  createCheckoutSession(id);
};

const removeBlurFromId = (id) => {
  document.getElementById(id).style.filter = "none";
};

const addBlurFromId = (id) => {
  document.getElementById(id).style.filter = "blur(1rem)";
};

const createCheckoutSession = (priceId) => {
  return fetch("http://localhost:5000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId: priceId,
      customerId: customerId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.replace(data.checkoutUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
