const express = require("express");
const { generateQR, validateQR } = require("../controllers/qrController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate/:eventId", authMiddleware, generateQR);
router.post("/validate", authMiddleware, validateQR);

module.exports = router;

