const Ticket = require("../models/ticketModel");

exports.validateTicket = async (req, res) => {
  try {
    const { qrCode } = req.body;
    const ticket = await Ticket.findOne({ qrCode });

    if (!ticket) return res.status(400).json({ message: "Invalid Ticket" });

    res.json({ message: "Ticket is valid", ticket });
  } catch (error) {
    res.status(500).json({ message: "Ticket validation failed", error });
  }
};
