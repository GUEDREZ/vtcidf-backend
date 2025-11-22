// ============================================================
//   PayPal Client – Premium VTC IDF
// ============================================================

import paypal from "@paypal/checkout-server-sdk";

function environment() {
  return new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_SECRET
  );
}

function paypalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}

export default paypalClient();
