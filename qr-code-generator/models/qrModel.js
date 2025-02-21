// QR Code schema (Merged with ticket system)
const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    qrCode: { type: String, required: true },
    scannedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("QR", qrSchema);
