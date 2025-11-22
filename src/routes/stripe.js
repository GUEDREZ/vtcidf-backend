// ============================================================
//   Stripe Routes – Premium VTC IDF
// ============================================================

import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----- Créer session Stripe -----
router.post("/checkout", async (req, res) => {
  try {
    const { price } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: process.env.FRONTEND_URL + "/success",
      cancel_url: process.env.FRONTEND_URL + "/cancel",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Course Premium VTC" },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: "Erreur création session Stripe" });
  }
});

export default router;
