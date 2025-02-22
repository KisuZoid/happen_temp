const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  qrCode: { type: String, required: true, unique: true }
});

qrSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("QR", qrSchema);

