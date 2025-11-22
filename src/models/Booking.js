// ============================================================
//   Booking Model – Premium VTC IDF
// ============================================================

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String, required: true },

    startAddress: { type: String, required: true },
    endAddress: { type: String, required: true },

    distanceKm: { type: Number, required: true },
    durationText: { type: String, required: true },
    price: { type: Number, required: true },

    dateTime: { type: String, required: true },

    passengers: { type: Number, default: 1 },
    message: { type: String },

    paymentMethod: {
      type: String,
      enum: ["paypal", "stripe", "cash", "card", "onboard"],
      default: "onboard",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    reservationStatus: {
      type: String,
      enum: ["pending", "accepted", "completed", "canceled"],
      default: "pending",
    },

    pdfUrl: { type: String },

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Booking", BookingSchema);
