//QR Code generation, attendance tracking & validation
const QRCode = require("qrcode");
const Ticket = require("../models/ticketModel");
const mongoose = require("mongoose");

exports.generateQR = async (req, res) => {
  try {
    let { userId, eventId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId))
      return res.status(400).json({ message: "Invalid ID format" });

    const qrData = `${userId}-${eventId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const newTicket = new Ticket({ userId, eventId, qrCode });
    await newTicket.save();

    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};