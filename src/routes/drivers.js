// ============================================================
//   Driver Routes – Premium VTC IDF
// ============================================================

import express from "express";
import Driver from "../models/Driver.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

// ----- Ajouter chauffeur -----
router.post("/add", authGuard, async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: "Erreur ajout chauffeur." });
  }
});

// ----- Liste chauffeurs -----
router.get("/all", authGuard, async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: "Erreur liste chauffeurs." });
  }
});

// ----- Changer disponibilité -----
router.put("/:id/availability", authGuard, async (req, res) => {
  try {
    await Driver.findByIdAndUpdate(req.params.id, {
      isAvailable: req.body.isAvailable,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur disponibilité." });
  }
});

export default router;
