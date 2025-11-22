// ============================================================
//   PDF Routes – Premium VTC IDF
// ============================================================

import express from "express";
import { generatePDFBuffer } from "../utils/pdfGenerator.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const buffer = await generatePDFBuffer(req.body);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=reservation.pdf");

    return res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Erreur génération PDF" });
  }
});

export default router;
