// ============================================================
//   Telegram Routes – Premium VTC IDF
// ============================================================

import express from "express";
import { sendTelegram } from "../utils/sendTelegram.js";

const router = express.Router();

router.post("/notify", async (req, res) => {
  try {
    await sendTelegram(req.body.message);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur envoi Telegram" });
  }
});

export default router;
