// ============================================================
//   Auth Guard – Vérification Token JWT
// ============================================================

import jwt from "jsonwebtoken";

export const authGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Accès refusé : token manquant." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};
