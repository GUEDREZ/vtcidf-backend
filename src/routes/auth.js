// ============================================================
//   Auth Routes – Premium VTC IDF
// ============================================================

import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ----- Création automatique de l'admin si inexistant -----
router.post("/init-admin", async (req, res) => {
  try {
    const exists = await User.findOne({ email: "admin@premiumvtcidf.com" });

    if (exists) return res.json({ message: "Admin déjà créé." });

    const admin = new User({
      email: "admin@premiumvtcidf.com",
      password: "Admin123!",
      role: "admin",
    });

    await admin.save();

    res.json({ message: "Admin créé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'initialisation admin." });
  }
});

// ----- LOGIN -----
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Utilisateur introuvable." });

    const valid = await admin.comparePassword(password);
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect." });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
