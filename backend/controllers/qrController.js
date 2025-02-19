//QR code generator
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const Ticket = require("../models/ticketModel");

exports.generateQR = async (req, res) => {
  try {
    let { userId, eventId } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid eventId format" });
    }

    userId = new mongoose.Types.ObjectId(userId);
    eventId = new mongoose.Types.ObjectId(eventId);

    const qrData = `${userId}-${eventId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const newTicket = new Ticket({ userId, eventId, qrCode });
    await newTicket.save();

    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


