const API_URL = "https://api.appspotted.com";

const STRIPE_CONFIG_ENDPOINT = `${API_URL}/payments/stripe/config`;
const CREATE_CHECKOUT_SESSION_ENDPOINT = `${API_URL}/payments/stripe/create_checkout_session`;
const CREATE_CUSTOMER_PORTAL_ENDPOINT = `${API_URL}/payments/stripe/create_customer_portal`;
const SUBSCRIBE_NEWSLETTER_ENDPOINT = `${API_URL}/newsletter/subscribe`;

export {
  STRIPE_CONFIG_ENDPOINT,
  CREATE_CHECKOUT_SESSION_ENDPOINT,
  CREATE_CUSTOMER_PORTAL_ENDPOINT,
  SUBSCRIBE_NEWSLETTER_ENDPOINT,
};
