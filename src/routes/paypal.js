// ============================================================
//   PayPal Routes – Premium VTC IDF
// ============================================================

import express from "express";
import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "../config/paypalClient.js";

const router = express.Router();

// ----- Créer Order PayPal -----
router.post("/create-order", async (req, res) => {
  try {
    const { price } = req.body;

    const order = await paypalClient.execute(
      new paypal.orders.OrdersCreateRequest({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "EUR", value: price.toString() },
          },
        ],
      })
    );

    res.json(order.result);
  } catch (error) {
    res.status(500).json({ error: "PayPal error create order" });
  }
});

// ----- Capturer paiement -----
router.post("/capture-order", async (req, res) => {
  try {
    const { orderId } = req.body;

    const capture = await paypalClient.execute(
      new paypal.orders.OrdersCaptureRequest(orderId)
    );

    res.json(capture.result);
  } catch (error) {
    res.status(500).json({ error: "PayPal error capture" });
  }
});

export default router;
