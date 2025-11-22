// ============================================================
//   MongoDB Connection – Premium VTC IDF (By Bachir)
// ============================================================

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ ERREUR CRITIQUE : MONGODB_URI est manquant dans .env");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    console.log("⏳ Connexion à MongoDB Atlas...");

    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connecté avec succès !");
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error);
    process.exit(1);
  }
};

// Gestion des déconnexions
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB déconnecté… tentative de reconnexion.");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnecté !");
});

// Gestion propre à l'arrêt serveur
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 Connexion MongoDB fermée proprement.");
  process.exit(0);
});
