//QR Code API
const express = require("express");
const { generateQR } = require("../controllers/qrController");
const router = express.Router();

router.post("/generate", generateQR);

module.exports = router;
