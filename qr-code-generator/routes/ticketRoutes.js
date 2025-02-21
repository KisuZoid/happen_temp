//Ticket schema (Includes QR tracking info)
const express = require("express");
const { generateTicket, validateTicket } = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", protect, generateTicket); // Generate a ticket for an event
router.post("/validate", protect, validateTicket); // Validate a ticket (QR scan)

module.exports = router;
