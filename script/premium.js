getParameter = (key) => {
  // Address of the current window
  address = window.location.search;

  // Returns a URLSearchParams object instance
  parameterList = new URLSearchParams(address);

  // Returning the respected value associated
  // with the provided key
  return parameterList.get(key);
};

// Fetch price data.
const pricesDiv = document.querySelector("#price-list");
const customerId = getParameter("customerId");
const planLoader = document.querySelector("#plan-loader");
const loadError = document.querySelector("#load-error");
let stripe = Stripe(
  "pk_test_51KgAMTAhya2ryDXno4s83rhVITSX95gBV7KRs9TZ0UYqvPHV8YmII9mhfBd5YmGd6ma0xmrohA5a5EXtB5oFFxlz00spGq7Noj"
);

fetch("http://localhost:5000/config")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    pricesDiv.innerHTML = "";
    if (!data) {
      pricesDiv.innerHTML = `
        <h3>No prices found</h3>
      `;
    }

    data.response.forEach((prod) => {
      prod.prices.forEach((price) => {
        pricesDiv.innerHTML += `
        <div id="${price.id}" class="package" ${
          customerId
            ? `onclick="createSubscription(\'${price.id}\')" ontouchstart="createSubscription(\'${price.id}\')"`
            : ""
        }>
          <div class="name">${prod.name}</div>
          <div class="pricing">${price.unit_amount / 100} / ${
          price.recurringInterval
        }</div>
          <hr>
          <p>${prod.description}</p>
        </div>`;
      });
    });
  })
  .catch((error) => {
    planLoader.style.display = "None";
    loadError.style.display = "block";
    console.error("Error:", error);
  });

const createSubscription = (priceId) => {
  const plans = document.querySelector(`.package:not(#${priceId})`);

  plans.style.display = "none";
  const paymentDiv = document.querySelector("#payment-div");
  paymentDiv.style.display = "block";
  return fetch("http://localhost:5000/create-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId: priceId,
      customer: customerId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.sessionStorage.setItem("subscriptionId", data.subscriptionId);
      window.sessionStorage.setItem("clientSecret", data.clientSecret);
      loadPaymentForm();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const loadPaymentForm = () => {
  const paymentDiv = document.querySelector("#payment-div");
  paymentDiv.style.display = "block";
  

  const options = {
    clientSecret: window.sessionStorage.getItem("clientSecret"),

    fonts: [
      {
        family: "Baloo 2",
        src: 'url("https://fonts.googleapis.com/css2?family=Baloo+2&display=swap")',
        weight: "500",
      },
    ],
    // Fully customizable with appearance API.
    appearance: {
      theme: "flat",
      variables: {
        colorPrimary: "#8436c8",
        colorBackground: "#2b3344",
        colorText: "#f8f4fb",
        colorDanger: "#df1b41",
        spacingUnit: "2px",
        borderRadius: "4px",
        // See all possible variables below
      },
    },
  };

  // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
  const elements = stripe.elements(options);

  // Create and mount the Payment Element
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
  paymentElement.on("ready", function (event) {
    document.querySelector("#formLoading").style.display = "none";
    document.querySelector("#payment-element").style.display = "block";
    document.querySelector("#payButton").style.display = "block";
  });
};

const form = document.getElementById("payment-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const clientSecret = window.sessionStorage.getItem("clientSecret");
  const message = document.querySelector("#message");
  if (!clientSecret) {
    message.innerText = "Something went wrong.";
    return;
  }
  // Retrieve the PaymentIntent
  stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    const message = document.querySelector("#status-message");

    console.log(paymentIntent.status);

    // Inspect the PaymentIntent `status` to indicate the status of the payment
    // to your customer.
    //
    // Some payment methods will [immediately succeed or fail][0] upon
    // confirmation, while others will first enter a `processing` state.
    //
    // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    switch (paymentIntent.status) {
      case "succeeded":
        message.style.display = 'block';
        message.className = "toast success-toast";
        message.innerHTML =
          '<i class="fa fa-circle-o-notch fa-spin" style="padding: 0 1rem;"></i> Successo! Abbiamo ricevuto il tuo pagamento, ora puoi goderti il tuo abbonamento Spotted <span class="purple-gradient-text">Premium</span>';
        break;

      case "processing":
        message.style.display = 'block';
        message.className = "toast neutral-toast";
        message.innerHTML =
          '<i class="fa fa-circle-o-notch fa-spin" style="padding: 0 1rem;"></i> Stiamo lavorando il tuo pagamento...';
        break;

      case "requires_payment_method":
        message.style.display = 'block';
        message.className = "toast error-toast";
        message.innerHTML =
          '<i class="fa fa-circle-o-notch fa-spin" style="padding: 0 1rem;"></i> Il pagamento non è andato a buon fine, prova con un altro metodo di pagamento.';
        // Redirect your user back to your payment page to attempt collecting
        // payment again
        break;

      default:
        message.style.display = 'block';
        message.className = "toast error-toast";
        message.innerHTML =
          '<i class="fa fa-circle-o-notch fa-spin" style="padding: 0 1rem;"></i> Qualcosa è andato storto';
        break;
    }
  });
});
