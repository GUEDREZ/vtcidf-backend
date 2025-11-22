const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const dispatchRoutes = require("./routes/dispatchRoutes");
const chauffeurRoutes = require("./routes/chauffeurRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api/dispatch", dispatchRoutes);
app.use("/api/chauffeurs", chauffeurRoutes);
app.use("/api/reservations", reservationRoutes);

// Route de test serveur
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Premium VTC backend opérationnel" });
});

// Static
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB
if (!process.env.MONGO_URI) {
  console.error("❌ ERREUR : MONGO_URI est manquant dans .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
