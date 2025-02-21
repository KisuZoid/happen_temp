const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  qrCode: { type: String, required: true, unique: true },
  scanned: { type: Boolean, default: false }
});

module.exports = mongoose.model("Ticket", ticketSchema);


