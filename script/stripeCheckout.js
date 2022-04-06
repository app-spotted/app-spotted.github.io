// Arrow function to get all the GET parameters
getParameters = () => {
  
    // Address of the current window
    address = window.location.search
  
    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)
  
    // Created a map which holds key value pairs
    let map = new Map()
  
    // Storing every key value pair in the map
    parameterList.forEach((value, key) => {
        map.set(key, value)
    })
  
    // Returning the map of GET parameters
    return map
}

// Arrow function to get single paramether
getParameter = (key) => {
  
    // Address of the current window
    address = window.location.search
  
    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)
  
    // Returning the respected value associated
    // with the provided key
    return parameterList.get(key)
}

// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = Stripe('pk_test_51KgAMTAhya2ryDXno4s83rhVITSX95gBV7KRs9TZ0UYqvPHV8YmII9mhfBd5YmGd6ma0xmrohA5a5EXtB5oFFxlz00spGq7Noj');

// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
const elements = stripe.elements();

// Create and mount the Payment Element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');