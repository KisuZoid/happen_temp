const QRCode = require("qrcode");
const Ticket = require("../models/ticketModel");
const mongoose = require("mongoose");

exports.generateQR = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const existingTicket = await Ticket.findOne({ userId, eventId });
    if (existingTicket) return res.status(400).json({ message: "QR already generated for this user-event" });

    const qrData = `${userId}-${eventId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const newTicket = new Ticket({ userId, eventId, qrCode, scanned: false });
    await newTicket.save();

    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.scanQR = async (req, res) => {
  try {
    const { qrCode } = req.body;
    const ticket = await Ticket.findOne({ qrCode });

    if (!ticket) return res.status(404).json({ message: "Invalid QR Code" });

    if (ticket.scanned) return res.status(400).json({ message: "QR Code already scanned" });

    ticket.scanned = true;
    await ticket.save();

    res.json({ message: "QR Code scanned successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
