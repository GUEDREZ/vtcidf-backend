// ============================================================
//   Stripe Client – Premium VTC IDF
// ============================================================

import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
