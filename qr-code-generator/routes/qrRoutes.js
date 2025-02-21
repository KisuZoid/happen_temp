//Routes for QR & attendance system (Merged routes)
const express = require("express");
const { generateQR, scanQR } = require("../controllers/qrController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", protect, generateQR); // Generate QR Code for event
router.post("/scan", protect, scanQR); // Scan QR Code for attendance tracking

module.exports = router;

