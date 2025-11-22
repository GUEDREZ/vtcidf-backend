// ============================================================
//   Driver Model – Premium VTC IDF
// ============================================================

import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    password: { type: String }, // optionnel si authentification chauffeur
    photoUrl: { type: String },

    isActive: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: false },

    commissionDue: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export default mongoose.model("Driver", DriverSchema);
