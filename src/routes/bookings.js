// ============================================================
//   Booking Routes – Premium VTC IDF
// ============================================================

import express from "express";
import Booking from "../models/Booking.js";
import { authGuard } from "../middleware/authGuard.js";
import { validateInput } from "../middleware/validateInput.js";

const router = express.Router();

// ----- Créer réservation -----
router.post("/create", validateInput, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json({ success: true, booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Erreur création réservation." });
  }
});

// ----- Lister réservations (admin seulement) -----
router.get("/all", authGuard, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Erreur récupération réservations." });
  }
});

// ----- Modifier statut -----
router.put("/:id/status", authGuard, async (req, res) => {
  try {
    const { status } = req.body;
    await Booking.findByIdAndUpdate(req.params.id, {
      reservationStatus: status,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur mise à jour statut." });
  }
});

export default router;
