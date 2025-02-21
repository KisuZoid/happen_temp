const express = require("express");
const { generateTicket, validateTicket } = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate/:eventId", authMiddleware, generateTicket);
router.post("/validate", authMiddleware, validateTicket);

module.exports = router;

