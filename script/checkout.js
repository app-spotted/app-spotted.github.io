// helper method for displaying a status message.
const setMessage = (message) => {
    const messageDiv = document.querySelector('#messages');
    messageDiv.innerHTML += "<br>" + message;
  }


  let stripe = Stripe('pk_test_51KgAMTAhya2ryDXno4s83rhVITSX95gBV7KRs9TZ0UYqvPHV8YmII9mhfBd5YmGd6ma0xmrohA5a5EXtB5oFFxlz00spGq7Noj');
        

  const options = {
    clientSecret: window.sessionStorage.getItem('clientSecret'),
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };
  
  // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
  const elements = stripe.elements(options);
  
  // Create and mount the Payment Element
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');


  const form = document.querySelector('#payment-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://appspotted.com",
      }
    });
  
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      const messageContainer = document.querySelector('#error-message');
      messageContainer.textContent = error.message;
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  });
  